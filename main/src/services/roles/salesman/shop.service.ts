import { BadGatewayException, BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SalesmanService } from 'src/roles/salesman/salesman.service';
import { FileService, TYPE } from 'src/libs/file/file.service';
import { shopCreateDto } from 'src/roles/salesman/dto/create.dto';
import { shopUpdateDto } from 'src/roles/salesman/dto/authorization/update.dto';

@Injectable()
export class SalesmanShopService {
    constructor(
        private prisma: PrismaService,
        @Inject(forwardRef(() => SalesmanService))
        private salesmanService: SalesmanService,
        private file: FileService,
    ) {}

    async newShop(id: string, dto: shopCreateDto, avatar?: any) {
        const salesman = await this.salesmanService.getById(id);
        if (salesman.isVerified === false) {
            throw new BadRequestException('Please verify your account for this action');
        }
        if (!avatar) {
            const shop = await this.prisma.shop.create({
                data: {
                    title: dto.title,
                    avatar: '/uploads/avatars/default-shop.png',
                    salesmanId: id,
                },
            });

            await salesman.shops.push(shop);
            return shop;
        }

        const file = await this.file.writeFile(TYPE.AVATAR, avatar);
        const shop = await this.prisma.shop.create({
            data: {
                title: dto.title,
                avatar: file,
                salesmanId: id,
            },
        });

        await salesman.shops.push(shop);
        return shop;
    }

    async getShops(id: string) {
        const shop = this.prisma.shop.findMany({
            where: {
                salesmanId: id,
            },
        });

        return shop;
    }

    async getShop(id: string) {
        return this.prisma.shop.findUnique({
            where: {
                id: id,
            },
            include: {
                products: true,
                achivements: true,
                subscribers: true,
            },
        });
    }

    async getShopStatistic(id: string) {
        return this.prisma.shop.findUnique({
            where: {
                id,
            },
            select: {
                saleCount: true,
                ordersCount: true,
                totalProfit: true,
                productsRating: true,
                shopRating: true,
            },
        });
    }

    async updateShop(id: string, dto: shopUpdateDto, file?: any) {
        if (file) {
            if (dto.title) {
                const file = await this.file.writeFile(TYPE.AVATAR, this.file);
                const shop = await this.prisma.shop.update({
                    where: {
                        id,
                    },
                    data: {
                        avatar: file,
                        title: dto.title,
                    },
                });

                return shop;
            }

            const file = await this.file.writeFile(TYPE.AVATAR, this.file);
            const shop = await this.prisma.shop.update({
                where: {
                    id,
                },
                data: {
                    avatar: file,
                },
            });

            return shop;
        }

        return await this.prisma.shop.update({
            where: {
                id,
            },
            data: {
                title: dto.title,
            },
        });
    }

    async deleteShop(salesmanId: string, id: string) {
        const shop = await this.getById(id);

        if (shop.salesmanId !== salesmanId) throw new BadRequestException('You are have not right');
        await this.prisma.shop.delete({
            where: {
                id,
            },
        });

        return 'Shop is Deleted';
    }

    private async getById(id: string) {
        const shop = await this.prisma.shop.findUnique({
            where: {
                id,
            },
        });

        if (!shop) throw new BadRequestException('Shop with this id is not defined');
        return shop;
    }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { FakeUser } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FileService, TYPE } from 'src/libs/file/file.service';
import { shopCreateDto } from './dto/create.dto';
import { shopUpdateDto } from './dto/authorization/update.dto';
import { SalesmanShopService } from 'src/services/roles/salesman/shop.service';
import { botDto } from './dto/bot.dto';

@Injectable()
export class SalesmanService {
    constructor(
        private prisma: PrismaService,
        private file: FileService,
        private salesmanShop: SalesmanShopService,
    ) {}

    async updateData() {}

    async forVerify() {
        return {
            telegram: 'https://telegram.com/as-expressverify',
            message: 'Open this Bot and pass Personal datas for Verify your Account',
        };
    }

    async newSalesman(fake: FakeUser) {
        const salesman = await this.prisma.salesman.create({
            data: {
                title: fake.username,
                email: fake.email,
                password: fake.password,
                isVerified: false,
            },
        });
        return salesman;
    }

    async searchByBot(dto: botDto) {
        const salesman = await this.prisma.salesman.findFirst({
            where: {
                OR: [{ title: dto.title }, { email: dto.email }],
            },
        });

        if (!salesman) throw new BadRequestException('Salesman is not defined');
        return salesman;
    }

    async verifySalesman(email: string) {
        const salesman = await this.prisma.salesman.findFirst({
            where: {
                email,
            },
        });

        await this.prisma.salesman.update({
            where: {
                id: salesman.id,
            },
            data: {
                isVerified: true,
            },
        });

        return true;
    }

    async checkSalesman(email: string) {
        const salesman = await this.prisma.salesman.findUnique({
            where: {
                email,
            },
        });

        return salesman;
    }

    async getById(id: string) {
        const salesman = await this.prisma.salesman.findUnique({
            where: {
                id,
            },
            include: {
                shops: true,
            },
        });
        if (!salesman) {
            throw new BadRequestException('Salesman is not defined');
        }

        return salesman;
    }

    async getMe(id: string) {
        const salesman = await this.prisma.salesman.findUnique({
            where: {
                id,
            },
            include: {
                shops: true,
            },
        });
        if (!salesman) {
            throw new BadRequestException('Salesman is not defined');
        }

        return salesman;
    }

    async newShop(salesmanId: string, dto: shopCreateDto, avatar: any) {
        return this.salesmanShop.newShop(salesmanId, dto, avatar);
    }

    async getShops(id: string) {
        return this.salesmanShop.getShops(id);
    }

    async getStatistic(id: string) {
        return this.salesmanShop.getShopStatistic(id);
    }

    async updateShop(id: string, dto: shopUpdateDto) {
        return this.salesmanShop.updateShop(id, dto);
    }

    async deleteShop(salesmanId: string, id: string) {
        return this.salesmanShop.deleteShop(salesmanId, id);
    }
}

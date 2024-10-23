import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SalesmanService } from 'src/roles/salesman/salesman.service';
import { FileService, TYPE } from 'src/libs/file/file.service';
import { UserService } from 'src/roles/user/user.service';

@Injectable()
export class ShopService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
    ) {}

    async getShops(id: string) {
        const shop = this.prisma.shop.findMany({
            select: {
                title: true,
                avatar: true,
                shopRating: true,
                subscribersCount: true,
                productsRating: true,
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

    async subscribeToShop(userId: string, id: string): Promise<boolean> {
        const user = await this.userService.getById(userId);
        const shop = await this.getShop(id);

        const isHave = user.subscriptions.some((i) => i.id === shop.id);

        if (isHave) {
            const index = user.subscriptions.indexOf(shop);
            user.subscriptions.splice(index, 1);

            const indexShop = shop.subscribers.indexOf(user);
            shop.subscribersCount -= 1;
            shop.subscribers.splice(indexShop, 1);

            return true;
        }

        shop.subscribers.push(user);
        user.subscriptions.push(shop);

        return true;
    }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Basket, BasketItems, OrderItems } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/roles/user/user.service';

@Injectable()
export class BasketService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
    ) {}

    async newBasket(userId: string) {
        await this.prisma.basket.create({
            data: {
                userId,
            },
        });
    }

    async getBasket(userId: string): Promise<Basket> {
        const basket = await this.prisma.basket.findFirst({
            where: {
                userId: userId,
            },
            include: {
                products: true,
            },
        });

        return basket;
    }

    async addOrder(userId: string): Promise<OrderItems> {
        const order = await this.userService.checkOrder(userId);
        const basket = await this.getBasket(userId);
        const items = await this.getItems(basket.id);

        const orderItem = await this.prisma.orderItems.create({
            data: {
                productsCount: basket.productCount,
                price: basket.totalPrice,
                orderStatus: 'Collecting',
                orderId: order.id,
            },

            include: {
                products: true,
            },
        });

        items.map((i) => {
            orderItem.products.push(i.product);
        });

        return orderItem;
    }

    async updateBasket(userId: string, productsCount: number, productsPrice: number, item: BasketItems) {
        const basket = await this.prisma.basket.findFirst({
            where: {
                userId,
            },
            include: {
                products: true,
            },
        });

        basket.productCount += productsCount;
        basket.totalPrice += productsPrice;
        basket.products.push(item);

        return basket;
    }

    async checkItem(productId: string) {
        const item = await this.prisma.basketItems.findFirst({
            where: {
                productId,
            },
        });

        if (!item) throw new NotFoundException('Item is not defined');
        return item;
    }

    async removeItem(id: string) {
        await this.prisma.basketItems.delete({
            where: {
                id,
            },
        });
    }

    private getItems(id: string) {
        return this.prisma.basketItems.findMany({
            where: {
                basketId: id,
            },
            include: {
                product: true,
            },
        });
    }
}

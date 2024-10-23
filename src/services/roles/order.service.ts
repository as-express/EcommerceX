import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, OrderItems, Product } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { oneClickBuy } from 'src/shop-items/product/dto/one-click-buy.dto';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async newOrder(userId: string): Promise<void> {
        await this.prisma.order.create({
            data: {
                userId,
            },
        });
    }

    async getById(id: string): Promise<OrderItems> {
        const order = await this.prisma.orderItems.findUnique({
            where: {
                id,
            },
        });

        // if (!order) throw new NotFoundException('Order is not defined');
        return order;
    }

    async getAllOrders() {
        return this.prisma.orderItems.findMany();
    }

    async collectingOrders() {
        return this.prisma.orderItems.findMany({
            where: {
                orderStatus: 'Collecting',
            },
        });
    }
    async inWayOrders() {
        return this.prisma.orderItems.findMany({
            where: {
                orderStatus: 'InWay',
            },
        });
    }
    async deliveredOrders() {
        return this.prisma.orderItems.findMany({
            where: {
                orderStatus: 'Delivered',
            },
        });
    }
    async canceledOrders() {
        return this.prisma.orderItems.findMany({
            where: {
                orderStatus: 'Canceled',
            },
        });
    }

    async getOrders(userId: string): Promise<Order> {
        const order = await this.prisma.order.findFirst({
            where: {
                userId,
            },
            include: {
                orders: true,
            },
        });

        return order;
    }

    async addItem(userId: string, product: Product, totalPrice: number, dto: oneClickBuy) {
        const order = await this.getOrders(userId);

        const item = await this.prisma.orderItems.create({
            data: {
                productsCount: dto.count,
                price: totalPrice,
                orderStatus: 'Collecting',
                orderId: order.id,
            },
            include: {
                products: true,
            },
        });

        item.products.push(product);
        return order;
    }
}

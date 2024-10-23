import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { OrderService } from 'src/services/roles/order.service';
import { orderStatusDto } from './dto/order-status.dto';
import { Status } from '@prisma/client';

@Injectable()
export class OrderManagmentService {
    constructor(
        private prisma: PrismaService,
        private orderService: OrderService,
    ) {}

    async changeStatusOfOrder(id: string, dto: orderStatusDto) {
        const order = await this.orderService.getById(id);

        if (order.orderStatus === 'Delivered')
            throw new BadRequestException("You can't change the status of delivered order");

        const updatedOrder = await this.prisma.orderItems.update({
            where: {
                id,
            },
            data: {
                orderStatus: dto.status as unknown as Status,
            },
        });

        if (updatedOrder.orderStatus === 'Delivered') {
        }

        return updatedOrder;
    }

    async getAllOrders() {
        return this.orderService.getAllOrders();
    }

    async collectingOrders() {
        return this.orderService.collectingOrders();
    }
    async inWayOrders() {
        return this.orderService.inWayOrders();
    }
    async deliveredOrders() {
        return this.orderService.deliveredOrders();
    }
    async canceledOrders() {
        return this.orderService.canceledOrders();
    }
}

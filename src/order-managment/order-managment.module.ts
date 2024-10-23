import { Module } from '@nestjs/common';
import { OrderManagmentService } from './order-managment.service';
import { OrderManagmentController } from './order-managment.controller';
import { PrismaService } from 'prisma/prisma.service';
import { OrderService } from 'src/services/roles/order.service';

@Module({
    controllers: [OrderManagmentController],
    providers: [OrderManagmentService, PrismaService, OrderService],
})
export class OrderManagmentModule {}

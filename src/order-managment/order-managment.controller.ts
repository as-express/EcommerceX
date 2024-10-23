import { Body, Controller, Get, Param, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderManagmentService } from './order-managment.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { orderStatusDto } from './dto/order-status.dto';

@ApiTags('Order-Managment (Admin)')
// @UseInterceptors(CacheInterceptor)
@Controller('order-managment')
export class OrderManagmentController {
    constructor(private orderManagmentService: OrderManagmentService) {}

    @Get('all')
    // @CacheKey('all-orders')
    async getAllOrders() {
        return this.orderManagmentService.getAllOrders();
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async changeOrderStatus(@Param('id') id: string, @Body() dto: orderStatusDto) {
        return this.orderManagmentService.changeStatusOfOrder(id, dto);
    }

    @Get('collecting')
    // @CacheKey('collecting-orders')
    async getCollectingOrders() {
        return this.orderManagmentService.collectingOrders();
    }

    @Get('inway')
    // @CacheKey('inway-orders')
    async getInWayOrders() {
        return this.orderManagmentService.inWayOrders();
    }

    @Get('delivered')
    // @CacheKey('delivered-orders')
    async getDeliveredOrders() {
        return this.orderManagmentService.deliveredOrders();
    }

    @Get('canceled')
    // @CacheKey('canceled-orders')
    async getCanceledOrders() {
        return this.orderManagmentService.canceledOrders();
    }
}

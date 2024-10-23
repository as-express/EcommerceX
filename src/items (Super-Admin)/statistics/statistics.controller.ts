import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { mainStatisticResponse } from 'src/common/helpers/swagger-examples/docs/statistic.dto';
import { userStatisticResponse } from 'src/common/helpers/swagger-examples/docs/user/statistic.dto';
import { orderTableResponse } from 'src/common/helpers/swagger-examples/docs/order/order-table.dto';
import { orderStatisticResponse } from 'src/common/helpers/swagger-examples/docs/order/statistic.dto';
import { salerTableResponse } from 'src/common/helpers/swagger-examples/docs/saler/saler-table.dto';
import { productStatisticResponse } from 'src/common/helpers/swagger-examples/docs/product/statistic.dto';
import { productTableResponse } from 'src/common/helpers/swagger-examples/docs/product/product-table.dto';
import { salerStatisticResponse } from 'src/common/helpers/swagger-examples/docs/saler/statistic.dto';
import { userTableResponse } from 'src/common/helpers/swagger-examples/docs/user/user-table.dto';
import { Auth } from 'src/common/decorators/auth.decorator';

@SwaggerTag('Statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @SwaggerGenerator('main-statistic', mainStatisticResponse)
    @Get()
    @Auth()
    async getmainStatic() {
        return this.statisticsService.getStatistic();
    }

    @SwaggerGenerator('statistic-user', userStatisticResponse)
    @Get('user')
    @Auth()
    async getUserStatic() {
        return this.statisticsService.getUserStatistic();
    }

    @SwaggerGenerator('statistic-user-all-users', [userTableResponse])
    @Auth()
    @Get('user/all-users')
    async getUsers() {
        return this.statisticsService.getUserStatistic();
    }

    @SwaggerGenerator('statistic-saler', salerStatisticResponse)
    @Auth()
    @Get('saler')
    async getSalerStatic() {
        return this.statisticsService.getSalerStatistic();
    }

    @SwaggerGenerator('statistic-saler-top-salers', [salerTableResponse])
    @Auth()
    @Get('saler/top-salers')
    async getTopSalersStatic() {
        return this.statisticsService.getTopSalersStatistic();
    }

    @SwaggerGenerator('statistic-saler-all-salers', [salerTableResponse])
    @Auth()
    @Get('saler/all-salers')
    async getSalers() {
        return this.statisticsService.getUserStatistic();
    }

    @SwaggerGenerator('statistic-order', orderStatisticResponse)
    @Auth()
    @Get('orders')
    async getOrderStatic() {
        return this.statisticsService.getOrderStatistic();
    }

    @SwaggerGenerator('statistic-order-all-orders', [orderTableResponse])
    @Auth()
    @Get('orders/all-orders')
    async getOrders() {
        return this.statisticsService.getOrderStatistic();
    }

    @SwaggerGenerator('statistic-product', productStatisticResponse)
    @Auth()
    @Get('product')
    async getProductStatic() {
        return this.statisticsService.getProductStatistic();
    }

    @SwaggerGenerator('statistic-product-all-products', [productTableResponse])
    @Auth()
    @Get('product/all-products')
    async getProducts() {
        return this.statisticsService.getOrderStatistic();
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StatisticsService {
    constructor(private prisma: PrismaService) {}

    async getStatistic() {
        return await this.prisma.statistic.findFirst();
    }

    async getUserStatistic() {
        return await this.prisma.userStatistic.findFirst();
    }

    async getSalerStatistic() {
        return await this.prisma.salerStatistic.findFirst();
    }

    async getTopSalersStatistic() {
        return await this.prisma.topSaler.findFirst();
    }

    async getOrderStatistic() {
        return await this.prisma.orderStatistic.findFirst();
    }

    async getProductStatistic() {
        return await this.prisma.productSatistic.findFirst();
    }
}

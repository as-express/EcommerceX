import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StatisticsCreateService {
    constructor(private prisma: PrismaService) {}

    async allCreate() {
        await this.newOrderStatistic();
        await this.newProductStatistic(),
            await this.newSalerStatistic(),
            await this.newStatistic(),
            await this.newUserStatistic();
    }

    async newStatistic() {
        const id = await this.prisma.statistic.create({
            data: {},
        });
    }

    async newUserStatistic() {
        const id = await this.prisma.userStatistic.create({
            data: {},
        });
    }

    async newSalerStatistic() {
        const id = await this.prisma.salerStatistic.create({
            data: {},
        });
    }

    // async newTopSalersStatistic() {
    //     // const id = await this.prisma.topSaler.create({
    //     //     data: {},
    //     // })

    // }

    async newOrderStatistic() {
        const id = await this.prisma.orderStatistic.create({
            data: {},
        });
    }

    async newProductStatistic() {
        const id = await this.prisma.productSatistic.create({
            data: {},
        });
    }
}

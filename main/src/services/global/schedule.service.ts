import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ScheduleService {
    constructor(private prisma: PrismaService) {}

    @Cron('* */2 * * *')
    async handleCron() {
        const time = new Date(Date.now() - 2 * 60 * 1000);
        const result = await this.prisma.emailOtp.deleteMany({
            where: {
                createdAt: {
                    lt: time,
                },
            },
        });

        if (result.count === 0) {
            return console.log('Noting to delete');
        }

        console.log('Otp model is cleaned');
    }
}

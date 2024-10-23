import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationService {
    constructor(private prisma: PrismaService) {}

    async newNotificationAdmin(userId: string) {
        await this.prisma.notification.create({
            data: {
                adminId: userId,
            },
        });
    }

    async newNotification(userId: string) {
        await this.prisma.notification.create({
            data: {
                userId: userId,
            },
        });
    }

    async newNotificationSalesman(userId: string) {
        await this.prisma.notification.create({
            data: {
                salesmanId: userId,
            },
        });
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    async newChat(userId: string) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                username: 'SupportTeam',
            },
        });
        const chat = await this.prisma.chat.create({
            data: {
                userId,
                adminId: 'cm26at7ba000014ewngbv4zrh', // Admin id
                messageCount: 1,
            },
        });

        await this.prisma.message.create({
            data: {
                text: 'Welcome to As-Express IF you have a question please give our to know',
                chatId: chat.id,
                adminId: 'cm26at7ba000014ewngbv4zrh',
            },
        });
    }
}

export con = ''
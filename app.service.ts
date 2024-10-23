import { Injectable } from '@nestjs/common';
import { NodemailerService } from './nodemailer/nodemailer.service';
import { PrismaService } from 'prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    async addAdmin() {
        const password = await hash('supportAdmin100');
        const admin = await this.prisma.admin.create({
            data: {
                email: 'support@gmail.com',
                password: password,
                username: 'SupportTeam',
            },
        });

        await this.prisma.notification.create({
            data: {
                adminId: admin.id,
            },
        });

        console.log('Admin created successfuly');
    }
}

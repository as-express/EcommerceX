import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FakeUser } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {}

    //TODO: Authorization Helpers
    async checkAdmin(username?: string, email?: string) {
        const admin = await this.prisma.admin.findFirst({
            where: {
                AND: [{ username }, { email }],
            },
        });

        return admin;
    }

    async newAdmin(fakeAdmin: FakeUser) {
        const admin = await this.prisma.admin.create({
            data: {
                username: fakeAdmin.username,
                email: fakeAdmin.email,
                password: fakeAdmin.password,
            },
        });

        return admin;
    }

    async getById(id: string) {
        const admin = await this.prisma.admin.findUnique({
            where: { id },
        });

        if (!admin) {
            // throw new BadRequestException('Admin is not defind');
        }

        return admin;
    }
}

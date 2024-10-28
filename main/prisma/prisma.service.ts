import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    findUnique(arg0: { where: { id: string } }) {
        throw new Error('Method not implemented.');
    }
    updateMany(arg0: { where: { id: string }; data: import('../src/roles/user/dto/profile/update.dto').updateDto }) {
        throw new Error('Method not implemented.');
    }
    async onModuleInit() {
        await this.$connect();
    }
}

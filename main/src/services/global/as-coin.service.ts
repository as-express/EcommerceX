import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AsCoinService {
    constructor(private prisma: PrismaService) {}

    async newAsCoin(userId: string): Promise<void> {
        await this.prisma.asCoin.create({
            data: {
                count: 100,
                userId,
            },
        });
    }
}

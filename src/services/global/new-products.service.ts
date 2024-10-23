import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NewProductsService {
    constructor(private prisma: PrismaService) {}

    async getNewProducts() {
        const time = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

        const products = await this.prisma.product.findMany({
            where: {
                createdAt: {
                    lte: time,
                },
            },
        });

        return products;
    }
}

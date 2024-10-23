import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RecomendationService {
    constructor(private prisma: PrismaService) {}

    async getRecomendation(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                viewedProducts: true,
            },
        });

        if (!user || user.viewedProducts.length === 0) return [];

        const categoryIds = [...new Set(user.viewedProducts.map((product) => product.categoryId))];
        const viewedProductsId = user.viewedProducts.map((i) => i.id);

        const products = await this.prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryIds,
                },
                id: {
                    notIn: viewedProductsId,
                },
            },
        });

        return products;
    }
}

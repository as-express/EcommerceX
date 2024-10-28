import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorite } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FavoriteService {
    constructor(private prisma: PrismaService) {}

    async newFavorite(userId: string) {
        await this.prisma.favorite.create({
            data: {
                userId,
            },
        });
    }

    async getFavorite(id: string): Promise<Favorite> {
        const favorite = await this.prisma.favorite.findFirst({
            where: {
                userId: id,
            },
            include: {
                products: true,
            },
        });

        return favorite;
    }

    async checkProduct(userId: string, productId: string) {
        const favorite = await this.prisma.favorite.findFirst({
            where: {
                userId,
            },
            include: {
                products: true,
            },
        });

        const product = favorite.products.some((i) => i.id === productId);

        if (!product) return undefined;
        return product;
    }

    async addProduct(userId: string, productId: string) {
        const product = await this.getProduct(productId);
        const favorite = await this.prisma.favorite.findFirst({
            where: {
                userId,
            },
            include: {
                products: true,
            },
        });

        favorite.productsCount += 1;
        favorite.products.push(product);
    }

    async removeProduct(userId: string, productId: string) {
        const favorite = await this.prisma.favorite.findFirst({
            where: {
                userId,
            },
            include: {
                products: true,
            },
        });

        const index = favorite.products.findIndex((i) => i.id === productId);
        favorite.products.splice(index, 1);
        favorite.productsCount -= 1;

        // await prisma.favorite.update({
        //     where: { id: favoriteId },
        //     data: {
        //       products: {
        //         disconnect: { id: productId }, // Disconnect the product
        //       },
        //       productsCount: updatedCount,
        //     },
        //   })
    }

    private async getProduct(productId: string) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) throw new NotFoundException('Product is not defined ');
        return product;
    }
}

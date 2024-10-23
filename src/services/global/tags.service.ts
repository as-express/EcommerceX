import { BadRequestException, Injectable } from '@nestjs/common';
import { Product, Tag } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TagsService {
    constructor(private prisma: PrismaService) {}

    async newTag(title: string): Promise<Tag> {
        const newTag = await this.prisma.tag.create({
            data: {
                title,
            },
        });

        const tag = await this.prisma.tag.findUnique({
            where: {
                id: newTag.id,
            },
            include: {
                products: true,
            },
        });

        return tag;
    }

    async checkTag(title: string): Promise<Tag> {
        const tag = await this.prisma.tag.findFirst({
            where: {
                title,
            },
            include: {
                products: true,
            },
        });

        return tag;
    }

    async updateTag(title: string, product: Product): Promise<void> {
        const tag = await this.prisma.tag.findFirst({
            where: {
                title,
            },
            include: {
                products: true,
            },
        });

        tag.products.push(product);
        tag.productsCount += 1;
    }

    async getById(id: string): Promise<Tag> {
        const tag = await this.prisma.tag.findUnique({
            where: {
                id,
            },
            include: {
                products: true,
            },
        });

        if (!tag) throw new BadRequestException('Tag is not defined');
        return tag;
    }
}

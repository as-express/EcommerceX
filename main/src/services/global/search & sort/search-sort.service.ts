import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { searchSortDto } from './search-sort.dto';

@Injectable()
export class SearchSortService {
    constructor(private prisma: PrismaService) {}

    async search(title: string) {
        return this.prisma.product.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive',
                },
            },
        });
    }

    async filtering(dto: searchSortDto) {
        const where: any = {};

        Object.entries(dto).forEach(([key, value]) => {
            switch (key) {
                case 'categoryId':
                case 'sectionId':
                case 'model':
                    if (value) {
                        where[key] = value;
                    }
                    break;

                case 'colors':
                    if (value?.length) {
                        where.color = { hasSome: value };
                    }
                    break;

                case 'minPrice':
                    if (value !== undefined) {
                        where.price = { ...where.price, gte: value };
                    }
                    break;

                case 'maxPrice':
                    if (value !== undefined) {
                        where.price = { ...where.price, lte: value };
                    }
                    break;

                case 'rating':
                    if (value !== undefined) {
                        where.rating = { gte: value };
                    }
                    break;
            }
        });

        return this.prisma.product.findMany({ where });
    }
}

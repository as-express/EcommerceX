import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) {}

    async getReviews(id: string): Promise<Review[]> {
        return await this.prisma.review.findMany({
            where: {
                productId: id,
            },
        });
    }
}

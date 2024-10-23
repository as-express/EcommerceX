import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';

@Injectable()
export class CouponService {
    constructor(private prisma: PrismaService) {}

    async create(dto: createDto) {
        const coupon = await this.prisma.coupon.create({
            data: {
                title: dto.title,
                discount: dto.discount,
                orderFrom: dto.orderFrom,
                expiration: dto.expiration,
            },
        });

        return {
            message: 'Coupon Created',
            coupon,
        };
    }

    async getAll() {
        return await this.prisma.coupon.findMany();
    }

    async getByIddd(id: string) {
        return this.getById(id);
    }

    async update(id: string, dto: updateDto) {
        await this.getById(id);

        return await this.prisma.coupon.update({
            where: {
                id,
            },
            data: {
                title: dto.title,
                discount: dto.discount,
                orderFrom: dto.orderFrom,
            },
        });
    }

    async delete(id: string) {
        await this.getById(id);
        await this.prisma.coupon.delete({
            where: {
                id,
            },
        });

        return {
            message: 'Coupon is Deleted',
        };
    }

    private async getById(id: string) {
        const coupon = await this.prisma.coupon.findUnique({
            where: {
                id,
            },
        });

        if (!coupon) throw new NotFoundException('Coupon is not defind');
        return coupon;
    }
}

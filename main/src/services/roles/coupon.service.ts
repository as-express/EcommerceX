import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CouponService {
    constructor(private prisma: PrismaService) {}

    async newCoupon(user: User) {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 120);
        const coupon = await this.prisma.coupon.create({
            data: {
                title: 'Welcome Coupon',
                discount: 30000,
                orderFrom: 100000,
                expiration: expirationDate,
            },
            include: {
                users: true,
            },
        });

        coupon.users.push(user);
    }

    async getCoupon(id: string) {
        const coupon = await this.prisma.coupon.findUnique({
            where: {
                id,
            },
        });

        if (!coupon) return undefined;
        return coupon;
    }

    async getUserCoupons(userId: string) {
        const allCoupons = await this.prisma.coupon.findMany({
            include: {
                users: true,
            },
        });

        const coupons = allCoupons.filter((coupon) => coupon.users.some((u) => u.id === userId));
        const count = coupons.length;

        return {
            count,
            coupons,
        };
    }

    async removeCoupon(userId: string, id: string) {
        // await this.prisma.coupon.findMany({
        //     where: {},
        // });
        // const t = this.prisma.coupon.findFirst({
        //     where: {
        //         userId,
        //     },
        // });
    }
}

import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FileService } from 'src/libs/file/file.service';
import { ShopService } from 'src/shop/shop.service';
import { SalesmanService } from 'src/roles/salesman/salesman.service';
import { UserService } from 'src/roles/user/user.service';
import { CouponService } from 'src/services/roles/coupon.service';
import { SalesmanShopService } from 'src/services/roles/salesman/shop.service';

@Module({
    controllers: [AchievementController],
    providers: [
        AchievementService,
        PrismaService,
        FileService,
        SalesmanService,
        ShopService,
        UserService,
        SalesmanShopService,
        CouponService,
    ],
})
export class AchievementModule {}

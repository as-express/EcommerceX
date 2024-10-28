import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaService } from 'prisma/prisma.service';
import { SalesmanService } from 'src/roles/salesman/salesman.service';
import { FileService } from 'src/libs/file/file.service';
import { UserService } from 'src/roles/user/user.service';
import { CouponService } from 'src/services/roles/coupon.service';
import { AchievementService } from 'src/items (Super-Admin)/achievement/achievement.service';
import { SalesmanShopService } from 'src/services/roles/salesman/shop.service';

@Module({
    controllers: [ShopController],
    providers: [
        ShopService,
        PrismaService,
        SalesmanShopService,
        SalesmanService,
        FileService,
        UserService,
        CouponService,
    ],
})
export class ShopModule {}

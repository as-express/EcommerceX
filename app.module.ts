import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { NodemailerService } from './nodemailer/nodemailer.service';
import { PrismaService } from 'prisma/prisma.service';
import { SeedModule } from './seed/seed.module';
import { AdminModule } from './roles/admin/admin.module';
import { UserModule } from './roles/user/user.module';
import { SalesmanModule } from './roles/salesman/salesman.module';
import { StatisticsModule } from './items (Super-Admin)/statistics/statistics.module';
import { CategoryModule } from './shop-items/category/category.module';
import { SectionModule } from './shop-items/section/section.module';
import { BrandModule } from './shop-items/brand/brand.module';
import { ProductModule } from './shop-items/product/product.module';
import { ShopModule } from './shop/shop.module';
import { CouponModule } from './items (Super-Admin)/coupon/coupon.module';
import { TagModule } from './shop-items/tag/tag.module';
import { OrderManagmentModule } from './order-managment/order-managment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './services/global/schedule.service';
import { AchievementModule } from './items (Super-Admin)/achievement/achievement.module';
import { AdminService } from './roles/admin/admin.service';
import { SalesmanShopModule } from './salesman-shop/salesman-shop.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '..', 'uploads'),
            serveRoot: '/uploads/',
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        // CacheModule.register({
        //     store: redisStore,
        //     host: 'redis',
        //     port: 6379,
        //     isGlobal: true,
        // }),
        ScheduleModule.forRoot(),
        AuthModule,
        AdminModule,
        UserModule,
        NodemailerModule,
        SalesmanModule,
        CategoryModule,
        SectionModule,
        SeedModule,
        BrandModule,
        CategoryModule,
        ProductModule,
        StatisticsModule,
        CouponModule,
        TagModule,
        ShopModule,
        OrderManagmentModule,
        AchievementModule,
        SalesmanShopModule,
    ],
    controllers: [AppController],
    providers: [AppService, ConfigModule, NodemailerService, PrismaService, AdminService, ScheduleService],
})
export class AppModule {}

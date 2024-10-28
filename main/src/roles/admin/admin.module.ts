import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { SalesmanService } from '../salesman/salesman.service';
import { jwtStregy } from 'src/libs/strategies/jwt.strategy';
import { FileService } from 'src/libs/file/file.service';
import { CouponService } from 'src/services/roles/coupon.service';
import { SalesmanShopService } from 'src/services/roles/salesman/shop.service';

@Module({
    imports: [ConfigModule, UserModule, NodemailerModule],
    controllers: [AdminController],
    providers: [
        AdminService,
        PrismaService,
        jwtStregy,
        CouponService,
        SalesmanShopService,
        SalesmanService,
        FileService,
        UserService,
        NodemailerService,
    ],
})
export class AdminModule {}

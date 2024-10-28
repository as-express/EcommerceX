import { forwardRef, Module } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { SalesmanController } from './salesman.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { jwtStregy } from 'src/libs/strategies/jwt.strategy';
import { FakeUserService } from 'src/services/global/fake-user.service';
import { OtpService } from 'src/services/global/otp.service';
import { CouponService } from 'src/services/roles/coupon.service';
import { BasketService } from 'src/services/roles/basket.service';
import { NotificationService } from 'src/services/roles/notification.service';
import { OrderService } from 'src/services/roles/order.service';
import { FavoriteService } from 'src/services/roles/favorite.service';
import { ChatService } from 'src/services/roles/chat.service';
import { ShopService } from 'src/shop/shop.service';
import { SalesmanShopService } from 'src/services/roles/salesman/shop.service';
import { FileService } from 'src/libs/file/file.service';
import { getJwtConfig } from 'src/common/configs/jwt.cfg';

@Module({
    imports: [
        ConfigModule,
        SalesmanModule,
        forwardRef(() => AuthModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
    ],
    controllers: [SalesmanController],
    providers: [
        SalesmanService,
        PrismaService,
        BasketService,
        SalesmanShopService,
        NotificationService,
        ChatService,
        jwtStregy,
        ShopService,
        OrderService,
        ShopService,
        FavoriteService,
        FileService,
        OtpService,
        AuthService,
        CouponService,
        FakeUserService,
        UserService,
        AdminService,
        NodemailerService,
    ],
    exports: [SalesmanService],
})
export class SalesmanModule {}

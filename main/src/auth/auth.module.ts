import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { googleStrategy } from 'src/libs/strategies/google.strategy';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { AdminService } from 'src/roles/admin/admin.service';
import { UserModule } from 'src/roles/user/user.module';
import { SalesmanModule } from 'src/roles/salesman/salesman.module';
import { SalesmanService } from 'src/roles/salesman/salesman.service';
import { UserService } from 'src/roles/user/user.service';
import { jwtStregy } from 'src/libs/strategies/jwt.strategy';
import { FileService } from 'src/libs/file/file.service';
import { FakeUserService } from 'src/services/global/fake-user.service';
import { OtpService } from 'src/services/global/otp.service';
import { CouponService } from 'src/services/roles/coupon.service';
import { BasketService } from 'src/services/roles/basket.service';
import { NotificationService } from 'src/services/roles/notification.service';
import { OrderService } from 'src/services/roles/order.service';
import { FavoriteService } from 'src/services/roles/favorite.service';
import { ChatService } from 'src/services/roles/chat.service';
import { SalesmanShopService } from 'src/services/roles/salesman/shop.service';
import { getJwtConfig } from 'src/common/configs/jwt.cfg';

@Module({
    imports: [
        ConfigModule,
        SalesmanModule,
        UserModule,
        NodemailerModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        FileService,
        AdminService,
        PrismaService,
        CouponService,
        UserService,
        SalesmanService,
        BasketService,
        SalesmanShopService,
        NotificationService,
        OrderService,
        FavoriteService,
        FakeUserService,
        ChatService,
        jwtStregy,
        OtpService,
        googleStrategy,
        NodemailerService,
        FakeUserService,
    ],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FileService } from 'src/libs/file/file.service';
import { FakeUserService } from 'src/services/global/fake-user.service';
import { CouponService } from 'src/services/roles/coupon.service';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, FileService, FakeUserService, CouponService],
    exports: [UserService],
})
export class UserModule {}

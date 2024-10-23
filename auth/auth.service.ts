import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { hash, verify } from 'argon2';
import { Response } from 'express';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { UserService } from 'src/roles/user/user.service';
import { AdminService } from 'src/roles/admin/admin.service';
import { SalesmanService } from 'src/roles/salesman/salesman.service';
import { userSignup } from 'src/roles/user/dto/authorization/signup.dto';
import { userVerfiyDto } from 'src/roles/user/dto/authorization/verify.dto';
import { userForgetPassword } from 'src/roles/user/dto/authorization/repassword/forget-pas.dto';
import { userVerifyNewPassword } from 'src/roles/user/dto/authorization/repassword/verify-newpass.dto';
import { userLoginDto } from 'src/roles/user/dto/authorization/login.dto';
import { salesmanSignupDto } from 'src/roles/salesman/dto/authorization/signup.dto';
import { salesmanOtpDto } from 'src/roles/salesman/dto/authorization/otp.dto';
import { salesmanSigninDto } from 'src/roles/salesman/dto/authorization/signin.dto';
import { salesmanForgetDto } from 'src/roles/salesman/dto/authorization/forget-password/forget.dto';
import { salesmanVerifyAndRepasswordDto } from 'src/roles/salesman/dto/authorization/forget-password/verify-repassword';
import { adminSignupDto } from 'src/roles/admin/dto/authorization/signup.dto';
import { adminOtpDto } from 'src/roles/admin/dto/authorization/otp.dto';
import { adminLoginDto } from 'src/roles/admin/dto/authorization/login.dto';
import { adminForgetPassword } from 'src/roles/admin/dto/authorization/forget-password/forgetPassword.dto';
import { adminVerifyDto } from 'src/roles/admin/dto/authorization/forget-password/verify.dto';
import { FileService } from 'src/libs/file/file.service';
import { tokenRes } from './dto/docs/token.dto';
import { FakeUserService } from 'src/services/global/fake-user.service';
import { OtpService } from 'src/services/global/otp.service';
import { CouponService } from 'src/services/roles/coupon.service';
import { BasketService } from 'src/services/roles/basket.service';
import { NotificationService } from 'src/services/roles/notification.service';
import { OrderService } from 'src/services/roles/order.service';
import { FavoriteService } from 'src/services/roles/favorite.service';
import { ChatService } from 'src/services/roles/chat.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private userService: UserService,
        private salesmanService: SalesmanService,
        private adminService: AdminService,
        private file: FileService,
        private fakeUserService: FakeUserService,
        private otpService: OtpService,
        private nodemailer: NodemailerService,
        private couponService: CouponService,
        private basketService: BasketService,
        private notificationService: NotificationService,
        private orderService: OrderService,
        private fakeService: FakeUserService,
        private favoriteService: FavoriteService,
        private chatService: ChatService,
    ) {}
    REFRESH_TOKEN_NAME = 'refreshToken';
    REFRESH_TOKEN_DATE = 1;

    async registerByEmail(dto: userSignup): Promise<string> {
        await this.userService.checkEmail(dto.email);
        await this.fakeService.newFake(dto);

        await this.nodemailer.sendMail(dto.email);
        return 'Go through otp';
    }

    async emailOtp(dto: userVerfiyDto) {
        const otp = await this.otpService.checkOtp(dto.email);
        const fake = await this.fakeUserService.checkFakeUser(dto.email);

        if (otp.code.toString() !== dto.code.toString()) {
            throw new BadRequestException('Code is not correct');
        }

        //TODO: User Create Action
        const user = await this.userService.newUser(fake);
        //TODO: Coupon Create Action
        await this.couponService.newCoupon(user);
        //TODO: Chat Create Chat
        await this.chatService.newChat(user.id);
        //TODO: Favorite Create Action
        await this.favoriteService.newFavorite(user.id);
        //TODO: Basket Create Action
        await this.basketService.newBasket(user.id);
        //TODO: Notification Create Action
        await this.notificationService.newNotification(user.id);
        //TODO: Order Create Action
        await this.orderService.newOrder(user.id);
        //TODO: Remove otp fake User Action
        await this.otpService.removeOtp(user.email);
        // fake del
        await this.fakeService.removeUser(fake.id);

        const avatar = await this.userService.setAvatar(user.gender);
        user.avatar = avatar;

        const tokens = await this.generateTokens(user.id);
        return tokens;
    }

    async userForgetPassword(dto: userForgetPassword): Promise<string> {
        await this.userService.oldUserCheck(dto.email);

        await this.nodemailer.sendMail(dto.email);
        return 'Go though verify';
    }

    async userVerifyandNewPassword(dto: userVerifyNewPassword): Promise<string> {
        const otp = await this.otpService.checkOtp(dto.email);

        const validCode = otp.code === dto.code;
        if (!validCode) {
            throw new BadRequestException('Code is not correct');
        }

        const hashP = await hash(dto.password);
        await this.prisma.user.update({
            where: {
                email: dto.email,
            },
            data: {
                password: hashP,
            },
        });

        return 'Password is changed';
    }

    async userLogin(dto: userLoginDto): Promise<tokenRes> {
        const user = await this.userService.checkEmail(dto.email);
        if (!user) {
            throw new BadRequestException('User with this email does not exist');
        }

        const validPass = await verify(user.password, dto.password);
        if (!validPass) {
            throw new BadRequestException('Password is not correct');
        }

        const tokens = await this.generateTokens(user.id);
        return tokens;
    }

    async googleLogin(req, res: Response) {
        if (!req.user) {
            return 'NO user from google';
        }

        const isHave = await this.userService.oldUserCheck(req.user.email);

        if (isHave) {
            const tokens = await this.generateTokens(req.user.id);
            await this.refreshCookie(res, tokens.refreshToken);
            return tokens;
        }

        const user = await this.fakeService.newGoogleFake(req);

        //TODO: Coupon Create Action
        await this.couponService.newCoupon(user);
        //TODO: Chat Create Chat
        await this.chatService.newChat(user.id);
        //TODO: Favorite Create Action
        await this.favoriteService.newFavorite(user.id);
        //TODO: Basket Create Action
        await this.basketService.newBasket(user.id);
        //TODO: Notification Create Action
        await this.notificationService.newNotification(user.id);
        //TODO: Order Create Action
        await this.orderService.newOrder(user.id);

        const tokens = await this.generateTokens(req.user.id);
        await this.refreshCookie(res, tokens.refreshToken);

        return {
            user: user,
            accessToken: tokens.accessToken,
        };
    }

    // TODO: Salesman Authorization Service

    async salesmanSignup(dto: salesmanSignupDto): Promise<string> {
        const isSalesman = await this.salesmanService.checkSalesman(dto.email);
        if (isSalesman) {
            throw new BadRequestException('Salesman is Already exist');
        }
        await this.fakeService.newSalesmanFake(dto);

        await this.nodemailer.sendMail(dto.email);
        return 'Through Otp verification';
    }

    async salesmanVerify(dto: salesmanOtpDto) {
        const otp = await this.otpService.checkOtp(dto.email);

        const isCode = otp.code === dto.code;
        if (!isCode) {
            throw new BadRequestException('Code is not correct');
        }

        const fakeUser = await this.fakeService.checkFakeUser(dto.email);
        const salesman = await this.salesmanService.newSalesman(fakeUser);

        //TODO: Notification Create Action
        await this.notificationService.newNotificationSalesman(salesman.id);
        await this.fakeService.removeUser(fakeUser.id);

        return await this.generateTokens(salesman.id);
    }

    async salesmanSignin(dto: salesmanSigninDto): Promise<tokenRes> {
        const salesman = await this.salesmanService.checkSalesman(dto.email);
        if (!salesman) throw new BadRequestException('Salesman with these data is not defined');

        const validPassword = await verify(salesman.password, dto.password);
        if (!validPassword) {
            throw new BadRequestException('Password is not correct');
        }
        console.log(salesman);

        const tokens = await this.generateTokens(salesman.id);
        return tokens;
    }

    async salesmanForgetPassword(dto: salesmanForgetDto): Promise<string> {
        const salesman = await this.salesmanService.checkSalesman(dto.email);
        if (!salesman) {
            throw new BadRequestException('Salesman is not defined');
        }

        await this.nodemailer.sendMail(dto.email);
        return 'Go through verify and update password';
    }

    async salesmanVerifyAndRePassword(dto: salesmanVerifyAndRepasswordDto) {
        const otp = await this.otpService.checkOtp(dto.email);

        const isCode = otp.code === dto.code;
        if (isCode) {
            throw new BadRequestException('Code is not correct');
        }

        const hashP = await hash(dto.password);

        await this.prisma.salesman.update({
            where: {
                email: dto.email,
            },
            data: {
                password: hashP,
            },
        });

        await this.otpService.removeOtp(dto.email);

        return 'Password is changed';
    }

    // TODO: Admin Authorization Service

    async adminSignup(dto: adminSignupDto): Promise<string> {
        const oldAdmin = await this.adminService.checkAdmin(dto.username, dto.email);
        if (oldAdmin) throw new BadRequestException('Admin with this username or email is already exist');

        await this.fakeService.newAdminFake(dto);

        await this.nodemailer.sendMail(dto.email);
        return 'Go Through Otp';
    }

    async adminOtp(dto: adminOtpDto) {
        const otp = await this.otpService.checkOtp(dto.email);
        if (otp.code !== dto.code) {
            throw new BadRequestException('Code is not correct');
        }

        const fakeAdmin = await this.fakeService.checkFakeUser(dto.email);
        const admin = await this.adminService.newAdmin(fakeAdmin);

        //TODO: Notification Create Action
        await this.notificationService.newNotificationAdmin(admin.id);

        await this.otpService.removeOtp(admin.id);

        await this.fakeService.removeUser(fakeAdmin.id);

        const tokens = await this.generateTokens(admin.id);
        return {
            admin,
            ...tokens,
        };
    }

    async adminSignin(dto: adminLoginDto): Promise<tokenRes> {
        const admin = await this.adminService.checkAdmin(dto.username, dto.email);
        if (!admin) {
            throw new BadRequestException('Admin with these data is not defind');
        }

        const validPassword = await verify(admin.password, dto.password);
        if (!validPassword) {
            throw new BadRequestException('Password is not correct');
        }

        const tokens = await this.generateTokens(admin.id);
        return tokens;
    }

    async adminForgotPassword(dto: adminForgetPassword): Promise<string> {
        const admin = await this.prisma.admin.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (admin) throw new NotFoundException('Admin with this email is not defined');

        await this.nodemailer.sendMail(admin.email);
        return 'GO though otp';
    }

    async adminVerifyAndAddNewPassword(dto: adminVerifyDto): Promise<string> {
        await this.adminService.checkAdmin(dto.email);
        const otp = await this.otpService.checkOtp(dto.email);

        const validCode = await verify(otp.code, dto.code);
        if (!validCode) {
            throw new BadRequestException('Code is not correct');
        }

        const hashP = await hash(dto.password);
        await this.prisma.admin.update({
            where: {
                email: dto.email,
            },
            data: {
                password: hashP,
            },
        });

        return 'Password is changed';
    }

    //TODO: Helpers

    async refreshCookie(res: Response, refreshToken: string): Promise<void> {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.REFRESH_TOKEN_DATE);

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
            secure: true,
            sameSite: 'none',
        });
    }

    async clearCookie(res: Response): Promise<void> {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: 'localhost',
            expires: new Date(0),
            secure: true,
            sameSite: 'none',
        });
    }

    async updateTokens(refreshToken: string) {
        const res = await this.jwt.verifyAsync(refreshToken);
        if (!res) {
            throw new BadRequestException('refreshToken is not valid');
        }

        const { ...user } = await this.userService.getById(res.id);
        const tokens = await this.generateTokens(user.id);

        return {
            user,
            ...tokens,
        };
    }

    async generateTokens(id: string): Promise<tokenRes> {
        const data = { id: id };

        console.log(data);

        const accessToken = this.jwt.sign(data, { expiresIn: '1h' });
        const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });

        return { accessToken, refreshToken };
    }
}

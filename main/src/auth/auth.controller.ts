import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { tokenRes } from './dto/docs/token.dto';
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

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SwaggerTag('User Authorization')
    @SwaggerGenerator('SignUp By Email', 'Go through otp')
    @Post('user/signup')
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    async userSignupEmail(@Body() dto: userSignup) {
        return this.authService.registerByEmail(dto);
    }

    @SwaggerTag('User Authorization')
    @SwaggerGenerator('Verify email', tokenRes)
    @Post('user/verify')
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    async userVerify(@Body() dto: userVerfiyDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.emailOtp(dto);
        this.authService.refreshCookie(res, refreshToken);

        return response;
    }

    @SwaggerTag('User Authorization')
    @SwaggerGenerator('Forget-Password', userForgetPassword)
    @Post('user/forget-password')
    @UsePipes(new ValidationPipe())
    async userForgetPassword(@Body() dto: userForgetPassword) {
        return this.authService.userForgetPassword(dto);
    }

    @SwaggerTag('User Authorization')
    @SwaggerGenerator('change-password', userForgetPassword)
    @Post('user/change-password')
    @UsePipes(new ValidationPipe())
    async otpAndRepassowrd(@Body() dto: userVerifyNewPassword) {
        return this.authService.userVerifyandNewPassword(dto);
    }

    @SwaggerTag('User Authorization')
    @SwaggerGenerator('Google Auth', '')
    @Post('user/signup-google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @SwaggerTag('User Authorization')
    @SwaggerGenerator('Google Callback res', tokenRes)
    @Get('/user/google-callback')
    @UseGuards(AuthGuard('google'))
    googleRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
        return this.authService.googleLogin(req, res);
    }

    @SwaggerTag('User Authorization')
    @SwaggerGenerator('Signin', tokenRes)
    @Post('user/signin')
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    async userSignin(@Body() dto: userLoginDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.userLogin(dto);
        this.authService.refreshCookie(res, refreshToken);

        return response;
    }

    //TODO Salesman Authorization

    @SwaggerTag('Salesman Authorization')
    @SwaggerGenerator('signup', salesmanSignupDto)
    @Post('salesman/signup')
    @UsePipes(new ValidationPipe())
    async salesmanSignup(@Body() dto: salesmanSignupDto) {
        return this.authService.salesmanSignup(dto);
    }

    @SwaggerTag('Salesman Authorization')
    @SwaggerGenerator('verify', tokenRes)
    @Post('salesman/verify')
    @UsePipes(new ValidationPipe())
    async salesmanVerify(@Body() dto: salesmanOtpDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.salesmanVerify(dto);
        this.authService.refreshCookie(res, refreshToken);

        return response;
    }

    @SwaggerTag('Salesman Authorization')
    @SwaggerGenerator('signin', tokenRes)
    @Post('salesman/signin')
    @UsePipes(new ValidationPipe())
    async salesmanSignin(@Body() dto: salesmanSigninDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.salesmanSignin(dto);
        this.authService.refreshCookie(res, refreshToken);

        return response;
    }

    @SwaggerTag('Salesman Authorization')
    @SwaggerGenerator('forget-password', 'Otp is Send')
    @Post('salesman/forget-password')
    @UsePipes(new ValidationPipe())
    async salesmanForgetPass(@Body() dto: salesmanForgetDto) {
        return this.authService.salesmanForgetPassword(dto);
    }

    @SwaggerTag('Salesman Authorization')
    @SwaggerGenerator('change-password', 'Password changed successful')
    @Post('salesman/change-password')
    @UsePipes(new ValidationPipe())
    async salesmanVerifyAndRepassword(@Body() dto: salesmanVerifyAndRepasswordDto) {
        return this.authService.salesmanVerifyAndRePassword(dto);
    }

    //TODO Admin Authorization

    @SwaggerTag('Admin Authorization')
    @SwaggerGenerator('Signup', 'Go through otp')
    @Post('admin/signup')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async adminSignup(@Body() dto: adminSignupDto) {
        return this.authService.adminSignup(dto);
    }

    @SwaggerTag('Admin Authorization')
    @SwaggerGenerator('Verify', tokenRes)
    @Post('admin/verify')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async adminVerify(@Body() dto: adminOtpDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.adminOtp(dto);
        this.authService.refreshCookie(res, refreshToken);

        return response;
    }

    @SwaggerTag('Admin Authorization')
    @SwaggerGenerator('Signin', tokenRes)
    @Post('admin/signin')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async signin(@Body() dto: adminLoginDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.adminSignin(dto);

        this.authService.refreshCookie(res, refreshToken);
        return response;
    }

    @SwaggerTag('Admin Authorization')
    @SwaggerGenerator('forget-password', 'go through otp')
    @Post('admin/forget-password')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async forgetPassword(@Body() dto: adminForgetPassword) {
        return this.authService.adminForgotPassword(dto);
    }

    @SwaggerTag('Admin Authorization')
    @SwaggerGenerator('change-password', 'Password is changed')
    @Post('admin/change-password')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async changePassword(@Body() dto: adminVerifyDto) {
        return this.authService.adminVerifyAndAddNewPassword(dto);
    }

    // TODO: General EndPoints

    @SwaggerTag('Logout/UpdateTokens')
    @SwaggerGenerator('Update Tokens', tokenRes)
    @ApiBearerAuth('JWT-auth')
    @Post('login/accestoken')
    @HttpCode(200)
    async accesToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const cookieToken = req.cookies[this.authService.REFRESH_TOKEN_NAME];

        if (!cookieToken) {
            this.authService.clearCookie(res);
            throw new BadRequestException('refreshToken is not valid');
        }

        const { refreshToken, ...response } = await this.authService.updateTokens(cookieToken);

        return response;
    }

    @SwaggerTag('Logout/UpdateTokens')
    @SwaggerGenerator('Logout', 'Tokens is expired')
    @ApiBearerAuth('JWT-auth')
    @Post('logout')
    @HttpCode(200)
    async userLogout(@Res({ passthrough: true }) res: Response) {
        this.authService.clearCookie(res);
        return true;
    }
}

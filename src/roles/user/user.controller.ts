import { Body, Controller, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { userDecorator } from 'src/common/decorators/user.decorator';
import { updateDto } from './dto/profile/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { userSignup } from './dto/authorization/signup.dto';
import { addressDto } from './dto/profile/address.dto';
import { addressExample } from 'src/common/helpers/swagger-examples/user-items/address.example';
import { basketExample } from 'src/common/helpers/swagger-examples/user-items/basket.example';
import { chatExample } from 'src/common/helpers/swagger-examples/user-items/chat.example';
import { CouponExample } from 'src/common/helpers/swagger-examples/user-items/coupon.example';
import { ReviewExample } from 'src/common/helpers/swagger-examples/user-items/reviews.example';
import { orderExample } from 'src/common/helpers/swagger-examples/user-items/order.example';
import { FavoriteExample } from 'src/common/helpers/swagger-examples/user-items/favorite.example';

@SwaggerTag('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @SwaggerGenerator('get Profile', userSignup)
    @Get('profile')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async getProfile(@userDecorator('id') id: string) {
        return this.userService.getProfile(id);
    }

    @SwaggerGenerator('Upload Avatar', 'File is upload')
    @Put('avatar-upload')
    @UseInterceptors(FileInterceptor('avatar'))
    @ApiBearerAuth('JWT-auth')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                avatar: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Auth()
    async uploadAvatar(@userDecorator('id') id: string, @UploadedFile() file) {
        return this.userService.uploadAvatar(id, file);
    }

    @SwaggerGenerator('Update data', updateDto)
    @Patch('update-data')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async updateData(@userDecorator('id') id: string, @Body() dto: updateDto) {
        return this.userService.updateProfile(id, dto);
    }

    @SwaggerGenerator('Add Address', addressExample)
    @Post('addresses/new')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async newAddress(@userDecorator('id') id: string, @Body() dto: addressDto) {
        return this.userService.addAddress(id, dto);
    }

    @SwaggerGenerator('Delete Address', true)
    @Post('addresses/:id')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async deleteAddress(@userDecorator('id') userId: string, @Param() id: string) {
        return this.userService.deleteAddress(userId, id);
    }

    @SwaggerGenerator('Get User Orders', orderExample)
    @Get('orders')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async getOrders(@userDecorator('id') id: string) {
        return this.userService.orders(id);
    }

    @SwaggerGenerator('Get User Favorite', FavoriteExample)
    @Get('favorite')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async getFavorite(@userDecorator('id') id: string) {
        return this.userService.favorites(id);
    }

    @SwaggerGenerator('Get User Basket', basketExample)
    @Get('basket')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async getBasket(@userDecorator('id') id: string) {
        return this.userService.basket(id);
    }

    @SwaggerGenerator('Get User Reviews', ReviewExample)
    @Get('reviews')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async getReviews(@userDecorator('id') id: string) {
        return this.userService.reviews(id);
    }

    @SwaggerGenerator('Get User Address', addressExample)
    @Get('addresses')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async getAddresses(@userDecorator('id') id: string) {
        return this.userService.addresses(id);
    }

    @SwaggerGenerator('Get User Chat', chatExample)
    @Get('chats')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async getChats(@userDecorator('id') id: string) {
        return this.userService.chats(id);
    }

    @SwaggerGenerator('Get User Coupons', CouponExample)
    @Get('coupons')
    @ApiBearerAuth('JWT-auth')
    @Auth()
    async getCoupons(@userDecorator('id') id: string) {
        return this.userService.coupons(id);
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { SalesmanGuard } from 'src/common/guards/saler.guard';
import { userDecorator } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { SwaggerExample, SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { ApiBearerAuth, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Prisma, PrismaClient } from '@prisma/client';
import { Auth } from 'src/common/decorators/auth.decorator';

@SwaggerTag('Shop (Salesman)')
@Controller('shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) {}

    @SwaggerExample('get Shop')
    @ApiResponse({ status: 200, type: '' })
    @ApiBearerAuth('JWT-auth')
    @Get(':id')
    @UseGuards(SalesmanGuard)
    async getShop(@Param('id') id: string) {
        return this.shopService.getShop(id);
    }
    @SwaggerGenerator('Subscribe to shop', '')
    @ApiResponse({ status: 200, type: '' })
    @Auth()
    @Post(':id/subscribe-shop')
    async subscribeToShop(@userDecorator('id') userId: string, @Param('id') id: string) {
        return this.shopService.subscribeToShop(userId, id);
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { SwaggerExample, SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { salesmanDecorator, userDecorator } from 'src/common/decorators/user.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { SalesmanGuard } from 'src/common/guards/saler.guard';
import { shopCreateDto } from './dto/create.dto';
import { shopUpdateDto } from './dto/authorization/update.dto';
import { botDto } from './dto/bot.dto';
import { Auth } from 'src/common/decorators/auth.decorator';

@SwaggerTag('Salesman')
@Controller('salesman')
export class SalesmanController {
    shopService: any;
    constructor(private readonly salesmanService: SalesmanService) {}

    @SwaggerGenerator('upload-avatar', 'avatar is uploaded')
    @ApiBearerAuth('JWT-auth')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @SwaggerGenerator('Actions For Verify', '')
    @ApiBearerAuth('JWT-auth')
    @Post('forVerify')
    async forVerify() {
        return this.salesmanService.forVerify();
    }

    @SwaggerGenerator('Search for telegram bot', '')
    @ApiBearerAuth('JWT-auth')
    @Post('verifySalesman')
    async verifyBYBot(email: string) {
        return this.salesmanService.verifySalesman(email);
    }

    @SwaggerGenerator('Search for telegram bot', '')
    @Post('search')
    async search(@Body() dto: botDto) {
        return this.salesmanService.searchByBot(dto);
    }

    @ApiResponse({ status: 200, type: shopCreateDto })
    @SwaggerGenerator('Create Shop', '')
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
                title: {
                    type: 'string',
                    title: 'Additional text description for the upload',
                },
            },
            required: ['file', 'title'],
        },
    })
    @Post('newShop')
    @Auth()
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('avatar'))
    async newShop(@salesmanDecorator('id') id: string, @Body() dto: shopCreateDto, @UploadedFile() avatar: any) {
        return this.salesmanService.newShop(id, dto, avatar);
    }

    @ApiBearerAuth('JWT-auth')
    @SwaggerGenerator('Get Profile', '')
    @Auth()
    @Get('me')
    async me(@salesmanDecorator('id') id: string) {
        return this.salesmanService.getMe(id);
    }

    @SwaggerGenerator('GEt Salesman Shop', '')
    @ApiResponse({ status: 200, type: '' })
    @ApiBearerAuth('JWT-auth')
    @Get()
    @Auth()
    async getShops(id: string) {
        return this.salesmanService.getShops(id);
    }

    @SwaggerGenerator('Update Shop Data', '')
    @ApiResponse({ status: 200, type: '' })
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
                title: {
                    type: 'string',
                    title: 'Additional text description for the upload',
                },
            },
            required: ['file', 'title'],
        },
    })
    @UseInterceptors(FileInterceptor('avatar'))
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseGuards(SalesmanGuard)
    async updateShops(@Param('id') id: string, @Body() dto: shopUpdateDto, @UploadedFile() avatar?: any) {
        return this.shopService.updateShop(id, dto, avatar);
    }

    @SwaggerGenerator('Delete Shop', '')
    @ApiResponse({ status: 200, type: '' })
    @ApiBearerAuth('JWT-auth')
    @Delete(':id')
    @UseGuards(SalesmanGuard)
    async deleteShop(@userDecorator('id') salesmanId: string, @Param('id') id: string) {
        return this.shopService.deleteShop(salesmanId, id);
    }
}

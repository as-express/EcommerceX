import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { SwaggerExample, SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SalesmanGuard } from 'src/common/guards/saler.guard';
import { createProduct } from './dto/create.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { userDecorator } from 'src/common/decorators/user.decorator';
import { addToBasketDto } from './dto/basket.dto';
import { ProductExample } from 'src/common/helpers/swagger-examples/shop/product.example';
import { productTableResponse } from 'src/common/helpers/swagger-examples/docs/product/product-table.dto';
import { oneClickBuy } from './dto/one-click-buy.dto';
import { updateProduct } from './dto/update.dto';
import { statusDto } from './dto/product-status.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { searchDto, searchSortDto } from 'src/services/global/search & sort/search-sort.dto';

@SwaggerTag('Product')
// @UseInterceptors(CacheInterceptor)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @SwaggerGenerator('create product', productTableResponse)
    // @UseGuards(SalesmanGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                title: {
                    type: 'string',
                },
                price: {
                    type: 'number',
                },
                shopId: {
                    type: 'string',
                },
                category: {
                    type: 'string',
                },
                section: {
                    type: 'string',
                },
                brand: {
                    type: 'string',
                },
                model: {
                    type: 'string',
                },
                size: {
                    type: 'array',
                },
                tag: {
                    type: 'array',
                },
                color: {
                    type: 'array',
                },
                version: {
                    type: 'array',
                },
                weight: {
                    type: 'string',
                },
                description: {
                    type: 'string',
                },
            },
            required: ['avatars', 'title', 'price', 'shopId', 'category'],
        },
    })
    @Post('new')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
    async newProduct(@Body() dto: createProduct, @UploadedFiles() images) {
        const { file } = images;
        const f1 = file[0];
        const f2 = file[1];
        const f3 = file[2];
        const f4 = file[3];
        const f5 = file[4];
        return this.productService.newProduct(dto, f1, f2, f3, f4, f5);
    }

    @SwaggerGenerator('Get All Products', [productTableResponse])
    @Get()
    // @CacheKey('products')
    // @CacheTTL(20)
    async getAllProducts(@Query('skip') skip: string, @Query('take') take: string) {
        const skipCount = parseInt(skip) || 0;
        const takeCount = parseInt(take) || 16;

        return this.productService.getAll(skipCount, takeCount);
    }

    @SwaggerGenerator('Get Top Products', [productTableResponse])
    // @CacheKey('tops')
    // @CacheTTL(20)
    @Get('top')
    async getTopProducts() {
        return this.productService.getTopProducts();
    }

    @SwaggerGenerator('Get New Products', [productTableResponse])
    // @CacheKey('news')
    // @CacheTTL(20)
    @Get('top')
    async getNewProducts() {
        return this.productService.getNewProducts();
    }

    @SwaggerGenerator('Get Product by id', productTableResponse)
    @Get(':id')
    async getProductById(@Param('id') id: string) {
        return this.productService.getById(id);
    }

    @SwaggerGenerator('Search product by title', productTableResponse)
    @UsePipes(new ValidationPipe())
    @Get('search')
    async searchProduct(@Body() dto: searchDto) {
        return this.productService.searchProduct(dto);
    }

    @SwaggerGenerator('Sorting product', [productTableResponse])
    @UsePipes(new ValidationPipe())
    @Get('sort')
    async sorting(@Body() dto: searchSortDto) {
        return this.productService.sorting(dto);
    }

    @SwaggerGenerator('Update Product info', '')
    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body() dto: updateProduct) {
        return this.productService.updateProduct(id, dto);
    }

    @SwaggerGenerator('Change to Active | dis Active', 'Changed')
    @Put(':id/status')
    async changeProductStatus(@Param('id') id: string, @Body() dto: statusDto) {
        return this.productService.changeProductStatus(id, dto);
    }

    @SwaggerGenerator('Push Product to basket', '')
    @ApiResponse({ status: 200, type: '' })
    @Auth()
    @Post(':id/basket')
    async pushToBasket(@userDecorator('id') userId: string, @Param('id') id: string, @Body() dto: addToBasketDto) {
        return this.productService.pushToBasket(userId, id, dto);
    }

    @SwaggerGenerator('Push Product to favorite', '')
    @ApiResponse({ status: 200, type: '' })
    @Auth()
    @Post(':id/favorite')
    async pushToFavorite(@userDecorator('id') userId: string, @Param('id') id: string) {
        return this.productService.pushToFavorite(userId, id);
    }

    @SwaggerGenerator('Get current shop', '')
    @ApiResponse({ status: 200, type: '' })
    @Auth()
    @Get(':id/shop')
    async getShop(@Param('id') id: string) {
        return this.productService.getShop(id);
    }

    @SwaggerGenerator('Buy by one click', [productTableResponse])
    @Auth()
    @Post(':id/buy')
    async oneClickBuy(@userDecorator('id') userId: string, @Param('id') id: string, @Body() dto: oneClickBuy) {
        return this.productService.buyOneClick(userId, id, dto);
    }
}

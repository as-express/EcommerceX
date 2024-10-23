import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { createBrand } from './dto/create.dto';
import { updateBrand } from './dto/update.dto';
import { BrandExample, updatedBrandExample } from 'src/common/helpers/swagger-examples/shop/brand.example';
import { product } from 'src/common/helpers/swagger-examples/user-items/basket.example';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@ApiTags('Brand')
// @UseInterceptors(CacheInterceptor)
@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @SwaggerGenerator('create Brand', BrandExample)
    @Post('new')
    // @Auth()
    @UseInterceptors(FileInterceptor('icon'))
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: createBrand, @UploadedFile() icon) {
        return this.brandService.create(dto, icon);
    }

    @SwaggerGenerator('get all Brand', [BrandExample])
    // @CacheKey('brands')
    @Get()
    // @Auth()
    async getAll() {
        return this.brandService.getAll();
    }

    @Get(':id')
    @SwaggerGenerator('get Brand by id', [product])
    // @Auth()
    async getById(@Param('id') id: string) {
        return this.brandService.getOne(id);
    }

    @Put(':id')
    @SwaggerGenerator('Update Brand', updatedBrandExample)
    @Auth()
    async update(@Param('id') id: string, @Body() dto: updateBrand) {
        return this.brandService.update(id, dto);
    }

    @Delete(':id')
    @SwaggerGenerator('create Brand', 'Deleted')
    @Auth()
    async delete(@Param('id') id: string) {
        return this.brandService.delete(id);
    }
}

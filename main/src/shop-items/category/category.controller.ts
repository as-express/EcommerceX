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
import { CategoryService } from './category.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { CategoryExample } from 'src/common/helpers/swagger-examples/shop/category.example';
import { product } from 'src/common/helpers/swagger-examples/user-items/basket.example';
import { updateCategory } from './dto/update.dto';
import { createCategory } from './dto/create.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('new')
    @SwaggerGenerator('create Category', CategoryExample)
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
    @Auth()  // Added @Auth decorator
    @UseInterceptors(FileInterceptor('icon'))
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: createCategory, @UploadedFile() icon) {
        return this.categoryService.create(dto, icon);
    }

    @Get()
    @SwaggerGenerator('get all Category', [CategoryExample])
    async getAll() {
        return this.categoryService.getAll();
    }

    @Get(':id')
    @SwaggerGenerator('get Category by id', [product])
    async getById(@Param('id') id: string) {
        return this.categoryService.getOne(id);
    }

    @Put(':id')
    @SwaggerGenerator('Update Category', CategoryExample)
    @Auth()  // Added @Auth decorator
    async update(@Param('id') id: string, @Body() dto: updateCategory) {
        return this.categoryService.update(id, dto);
    }

    @Delete(':id')
    @SwaggerGenerator('delete Category', 'Deleted')
    @Auth()  // Added @Auth decorator
    async delete(@Param('id') id: string) {
        return this.categoryService.delete(id);
    }
}

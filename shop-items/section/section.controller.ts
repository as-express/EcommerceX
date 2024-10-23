import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { SectionExample } from 'src/common/helpers/swagger-examples/shop/category.example';
import { product } from 'src/common/helpers/swagger-examples/user-items/basket.example';
import { SectionUpdateExample } from 'src/common/helpers/swagger-examples/shop/section.example';
import { createSection } from './dto/create.dto';
import { updateSection } from './dto/update.dto';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { AdminGuard } from 'src/common/guards/admin.guard';

@SwaggerTag('Section')
// @UseInterceptors(CacheInterceptor)
@Controller('section')
export class SectionController {
    constructor(private readonly sectionService: SectionService) {}

    @Post()
    @SwaggerGenerator('new Section', SectionExample)
    // @UseGuards(AdminGuard)
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: createSection) {
        return this.sectionService.create(dto);
    }

    @Get()
    // @CacheKey('sections')
    @SwaggerGenerator('get all Section', [SectionExample])
    async getAll() {
        return this.sectionService.getAll();
    }

    @Get(':id')
    @SwaggerGenerator('new Section', [product])
    async getById(@Param('id') id: string) {
        return this.sectionService.getById(id);
    }

    @Put(':id')
    @SwaggerGenerator('update Section', SectionUpdateExample)
    @Auth()
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() dto: updateSection) {
        return this.sectionService.update(id, dto);
    }

    @Delete(':id')
    @SwaggerGenerator('delete Section', 'Deleted')
    @Auth()
    async delete(@Param('id') id: string) {
        return this.sectionService.delete(id);
    }
}

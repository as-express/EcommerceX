import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';

@SwaggerTag('Coupon')
@Controller('coupon')
export class CouponController {
    constructor(private readonly couponService: CouponService) {}

    @Post()
    @SwaggerGenerator('new Coupon', createDto)
    // @Auth()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: createDto) {
        return this.couponService.create(dto);
    }

    @Get()
    @SwaggerGenerator('GetAll', [createDto])
    // @Auth()
    async getAll() {
        return this.couponService.getAll();
    }

    @Get(':id')
    @SwaggerGenerator('get Coupon by id', createDto)
    // @Auth()
    async getById(@Param('id') id: string) {
        return this.couponService.getByIddd(id);
    }

    @Patch()
    @SwaggerGenerator('update Coupon', updateDto)
    // @Auth()
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() dto: updateDto) {
        return this.couponService.update(id, dto);
    }

    @Delete()
    @SwaggerGenerator('Delete Coupon', 'Deleted')
    // @Auth()
    async delete(@Param('id') id: string) {
        return this.couponService.delete(id);
    }
}

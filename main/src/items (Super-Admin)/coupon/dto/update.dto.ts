import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class updateDto {
    @SwaggerExample('First Coupon')
    @IsNotEmpty()
    title: string;

    @SwaggerExample(5000)
    @IsNotEmpty()
    discount: number;

    @SwaggerExample(40000)
    @IsNotEmpty()
    orderFrom: number;

    @ApiProperty({ example: Date.now() })
    @IsOptional()
    expiration: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class createProduct {
    @SwaggerExample('Galaxy S10')
    @IsNotEmpty()
    title: string;

    @SwaggerExample(1000)
    @IsNotEmpty()
    price: number;

    @SwaggerExample('g12h3123716271')
    @IsNotEmpty()
    shopId: string;

    @ApiProperty({ example: ['#laptop', 'apple'] })
    @IsOptional()
    tag: string[];

    @SwaggerExample('Phone')
    @IsNotEmpty()
    category: string;

    @SwaggerExample('Elegant')
    @IsOptional()
    section?: string; // Optional field

    @SwaggerExample('Samsung')
    @IsOptional()
    brand?: string; // Optional field

    @SwaggerExample('S10 256GB')
    @IsNotEmpty()
    model: string;

    @SwaggerExample('Elegant Samsung series of phone')
    @IsOptional()
    description: string; // Optional field

    @ApiProperty({ example: ['Gray', 'Space Gray', 'Gold'] })
    @IsOptional()
    color?: string[];

    @ApiProperty({ example: ['6/128', '8/256', '8/512'] })
    @IsOptional()
    version?: string[];

    @ApiProperty({ example: ['12', '13.3', '15.6'] })
    @IsOptional()
    size?: string[];

    @ApiProperty({ example: '970g' })
    @IsOptional()
    weight?: string; // Assuming weight should be a string
}

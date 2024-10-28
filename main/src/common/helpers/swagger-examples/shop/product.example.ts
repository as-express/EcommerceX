import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class ProductExample {
    @SwaggerExample('1243124y3f2134fh')
    id: string;

    @SwaggerExample('Macbook')
    title: string;

    @ApiProperty({ example: ['macbook.png'] })
    images: string[];

    @SwaggerExample('macbook-product')
    slug: string;

    @SwaggerExample(2000)
    price: number;

    @SwaggerExample('Macbook')
    brandName: string;

    @SwaggerExample('Air 2019')
    model: string;

    @SwaggerExample('Macbook is air 2019 i7 good macbook')
    description: string[];

    @ApiProperty({ example: ['Gray', 'Space Gray', 'Gold'] })
    color: string[];

    @ApiProperty({ example: ['i7 256/8', 'i7 256/16', 'i7 512/16'] })
    version: string[];

    @ApiProperty({ example: ['13', '13.3', '15.6'] })
    size: string[];

    @ApiProperty({ example: '970g' })
    weight: string;
}

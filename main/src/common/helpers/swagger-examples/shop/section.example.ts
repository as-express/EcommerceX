import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';
import { product } from '../user-items/basket.example';

export class SectionExample {
    @SwaggerExample('hndjkqgh3jghj14')
    id: string;

    @SwaggerExample('Iphone')
    title: string;

    @SwaggerExample('iphone-section')
    slug: string;

    @SwaggerExample(0)
    productsCount: number;

    @ApiProperty({ example: [] })
    products: product;

    @SwaggerExample('hfqhrt341thjafl')
    categoryId: string;
}

export class SectionUpdateExample {
    @SwaggerExample('hndjkqgh3jghj14')
    id: string;

    @SwaggerExample('Samsung')
    title: string;

    @SwaggerExample('iphone-section')
    slug: string;

    @SwaggerExample(0)
    productsCount: number;

    @ApiProperty({ example: [] })
    products: product;

    @SwaggerExample('hfqhrt341thjafl')
    categoryId: string;
}

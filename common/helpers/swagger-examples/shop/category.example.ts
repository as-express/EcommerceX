import { SwaggerExample } from 'src/common/decorators/swagger.decorator';
import { product } from '../user-items/basket.example';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryExample {
    @SwaggerExample('hfqhrt341thjafl')
    id: string;

    @SwaggerExample('mobiles.svg')
    icon: string;

    @SwaggerExample('Mobile')
    title: string;

    @SwaggerExample('mobile-category')
    slug: string;

    @SwaggerExample(0)
    productsCount: number;

    @ApiProperty({ example: [] })
    products: [];

    @ApiProperty({ example: [] })
    sections: string[];
}

export class SectionExample {
    @SwaggerExample('qwhjg12yu3tgas23')
    id: string;

    @SwaggerExample('Motorolla')
    title: string;

    @SwaggerExample('motorolla-section')
    slug: string;

    @SwaggerExample(0)
    productsCount: number;

    @ApiProperty({ example: [] })
    products: [];

    @SwaggerExample('hfqhrt341thjafl')
    categoryId: string;
}

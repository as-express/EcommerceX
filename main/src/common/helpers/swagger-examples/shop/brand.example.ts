import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class BrandExample {
    @SwaggerExample('hfqhrt341thjafl')
    id: string;

    @SwaggerExample('apple.svg')
    icon: string;

    @SwaggerExample('Apple')
    title: string;

    @SwaggerExample('apple-brand')
    slug: string;

    @SwaggerExample(0)
    productsCount: number;

    @ApiProperty({ example: [] })
    products: [];
}

export class updatedBrandExample {
    @SwaggerExample('hfqhrt341thjafl')
    id: string;

    @SwaggerExample('redmi.svg')
    icon: string;

    @SwaggerExample('Xiomi')
    title: string;

    @SwaggerExample('xiomi-brand')
    slug: string;

    @SwaggerExample(0)
    productsCount: number;

    @ApiProperty({ example: [] })
    products: [];
}

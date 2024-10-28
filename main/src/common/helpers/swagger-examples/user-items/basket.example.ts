import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class product {
    @SwaggerExample('1243124y3f2134fh')
    id: string;

    @SwaggerExample('Milk')
    title: string;

    @ApiProperty({ example: ['milk.png'] })
    images: string[];

    @SwaggerExample('milk-product')
    slug: string;

    @SwaggerExample(10000)
    price: number;

    @SwaggerExample(900)
    oldPrice: number;

    @SwaggerExample('Nestle')
    brandName: string;

    @SwaggerExample('20%-1lt')
    model: string;

    @SwaggerExample(4.5)
    rating: number;
}

export class item {
    @SwaggerExample('1243124y3f2134fh')
    id: string;

    @ApiProperty({ example: product })
    product: product;

    @SwaggerExample(10000)
    price: number;
}

export class basketExample {
    @SwaggerExample('1243124y3f2134fh')
    id: string;

    @ApiProperty({ example: product })
    products: product;

    @SwaggerExample(10000)
    totalPrice: number;

    @SwaggerExample('6789124yjshawerf')
    userId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';
import { product } from './basket.example';

export class orderItemExample {
    @ApiProperty({ example: [product] })
    products: product[];

    @SwaggerExample(1)
    productsCount: number;

    @SwaggerExample(10000)
    price: number;

    @ApiProperty({ example: Date.now() })
    createdAt: Date;

    @SwaggerExample('InWay')
    orderStatus: string;
}

export class orderExample {
    @SwaggerExample('1243124y3f2134fh')
    id: string;

    @ApiProperty({ example: [orderItemExample] })
    orders: orderItemExample[];

    @SwaggerExample(1)
    ordersCount: number;

    @SwaggerExample('6789124yjshawerf')
    userId: string;
}

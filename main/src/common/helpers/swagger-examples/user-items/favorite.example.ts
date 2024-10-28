import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';
import { product } from './basket.example';

export class FavoriteExample {
    @ApiProperty({ example: [product] })
    products: product[];

    @SwaggerExample(1)
    productsCount: number;

    @SwaggerExample('6789124yjshawerf')
    userId: string;
}

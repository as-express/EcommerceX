import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class CouponExample {
    @SwaggerExample('h2du2g3y4tuyuy12jf')
    id: string;

    @SwaggerExample('Welcome')
    title: string;

    @SwaggerExample(1000)
    discount: number;

    @SwaggerExample(10000)
    orderFrom: number;

    @ApiProperty({ example: Date.now() })
    expiration: Date;

    @SwaggerExample('6789124yjshawerf')
    userId: number;
}

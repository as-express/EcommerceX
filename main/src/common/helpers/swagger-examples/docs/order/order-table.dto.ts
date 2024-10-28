import { ApiProperty } from '@nestjs/swagger';

export class orderTableResponse {
    @ApiProperty({ example: 'sjg12334hugy2f4yyfy' })
    id: string;

    @ApiProperty({ example: 2 })
    productsCount: number;

    @ApiProperty({ example: [] })
    products: string;

    @ApiProperty({ example: 350 })
    price: number;

    @ApiProperty({ example: Date.now() })
    createdAt: Date;

    @ApiProperty({ example: 'Delivered' })
    orderStatus: string;

    @ApiProperty({ example: 'ugyf1y4f2yu4f1yhfg1u' })
    orderId: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class orderStatisticResponse {
    @ApiProperty({ example: 1 })
    totalOrders: number;

    @ApiProperty({ example: 1 })
    collectingOrders: number;

    @ApiProperty({ example: 1 })
    inWayOrders: number;

    @ApiProperty({ example: 1 })
    canceledOrders: number;

    @ApiProperty({ example: 1 })
    deliveredOrders: number;
}

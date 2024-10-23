import { ApiProperty } from '@nestjs/swagger';

export class mainStatisticResponse {
    @ApiProperty({ example: 0 })
    adminCount: number;

    @ApiProperty({ example: 0 })
    salerCount: number;

    @ApiProperty({ example: 0 })
    userCount: number;

    @ApiProperty({ example: 0 })
    ordersCount: number;

    @ApiProperty({ example: 0 })
    saledCount: number;

    @ApiProperty({ example: 0 })
    totalProfit: number;
}

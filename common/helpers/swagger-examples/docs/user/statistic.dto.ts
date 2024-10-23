import { ApiProperty } from '@nestjs/swagger';

export class userStatisticResponse {
    @ApiProperty({ example: 1 })
    adminCount: number;

    @ApiProperty({ example: 1 })
    salersCount: number;

    @ApiProperty({ example: 1 })
    usersCount: number;

    @ApiProperty({ example: 1 })
    ordersCount: number;

    @ApiProperty({ example: 1 })
    saledCount: number;

    @ApiProperty({ example: 1 })
    totalProfit: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class productStatisticResponse {
    @ApiProperty({ example: 0 })
    totalProducts: number;

    @ApiProperty({ example: 0 })
    famousProducts: number;

    @ApiProperty({ example: 0 })
    highRatingProducts: number;

    @ApiProperty({ example: 0 })
    promotionProducts: number;
}

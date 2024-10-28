import { ApiProperty } from '@nestjs/swagger';

export class salerStatisticResponse {
    @ApiProperty({ example: 1 })
    totalSalers: number;

    @ApiProperty({ example: 0 })
    famousSalers: number;

    @ApiProperty({ example: 0 })
    newSalers: number;
}

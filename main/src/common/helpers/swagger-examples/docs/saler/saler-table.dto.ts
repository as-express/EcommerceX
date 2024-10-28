import { ApiProperty } from '@nestjs/swagger';

export class salerTableResponse {
    @ApiProperty({ example: 'shquwi2134jsdryu2341' })
    id: string;

    @ApiProperty({ example: 'Techno-Shop' })
    title: string;

    @ApiProperty({ example: 'market.png' })
    avatar: string;

    @ApiProperty({ example: 0 })
    productsCount: number;

    @ApiProperty({ example: 0 })
    promotionsCount: number;

    @ApiProperty({ example: 0 })
    salerRating: number;

    @ApiProperty({ example: 0 })
    productsRating: number;

    @ApiProperty({ example: 0 })
    subscribersCount: number;

    @ApiProperty({ example: 'saler@gmail.com' })
    email: string;
}

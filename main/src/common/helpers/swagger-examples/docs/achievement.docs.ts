import { ApiProperty } from '@nestjs/swagger';

export class AchievementResponce {
    @ApiProperty({ example: 'asf242b1231g13' })
    id: string;

    @ApiProperty({ example: '5 Stars' })
    title: string;

    @ApiProperty({ example: 'star.png' })
    icon: string;

    @ApiProperty({ example: 5 })
    rating: number;

    @ApiProperty({ example: 0 })
    sales: number;

    @ApiProperty({ example: 0 })
    subscribers: number;

    @ApiProperty({
        example:
            '5 Star achievement mean what this shop have good rating and many good reviews',
    })
    description: string;
}

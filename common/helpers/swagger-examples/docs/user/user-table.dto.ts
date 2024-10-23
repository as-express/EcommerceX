import { ApiProperty } from '@nestjs/swagger';

export class userTableResponse {
    @ApiProperty({ example: '13kh4u1jg4ug52913' })
    id: string;

    @ApiProperty({ example: 'avatar.png' })
    avatar: string;

    @ApiProperty({ example: 'Alex' })
    surname: string;

    @ApiProperty({ example: 'Mark' })
    username: string;

    @ApiProperty({ example: 'male' })
    gender: string;

    @ApiProperty({ example: 2006 })
    birth: number;

    @ApiProperty({ example: 'alex@gmail.com' })
    email: string;
}

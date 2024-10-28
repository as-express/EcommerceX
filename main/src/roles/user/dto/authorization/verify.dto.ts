import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class userVerfiyDto {
    @ApiProperty({ example: 'alex@gmail.com' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '1234' })
    @IsNotEmpty()
    code: string;
}

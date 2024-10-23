import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class userForgetPassword {
    @ApiProperty({ example: 'alex@gmail.com' })
    @IsNotEmpty()
    email: string;
}

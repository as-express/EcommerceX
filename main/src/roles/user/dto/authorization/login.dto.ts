import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';

export class userLoginDto {
    @ApiProperty({ example: 'alex@gmail.com' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '12345678' })
    @MinLength(8, {
        message: 'Password must be minimum 8 characters',
    })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])/, {
        message: 'Password must contain at least one uppercase letter',
    })
    password: string;
}

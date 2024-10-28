import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';

export class userVerifyNewPassword {
    @ApiProperty({ example: 'alex@gmail.com' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '1234' })
    @IsNotEmpty()
    code: string;

    @ApiProperty({ example: '12345678' })
    @MinLength(8, {
        message: 'Passowrd need be min 8 symbols',
    })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])/, {
        message: 'Password must contain at least one uppercase letter',
    })
    password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class salesmanOtpDto {
    @ApiProperty({ example: 'shop@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 1234 })
    @IsNotEmpty()
    code: string;
}

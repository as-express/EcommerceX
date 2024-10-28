import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class salesmanSignupDto {
    @ApiProperty({ example: 'Shop' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'shop@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'ASwe341452ew@' })
    @MinLength(8, { message: 'Password need be min 8 symbols' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
        message:
            'Password must contain at least one number, one symbol, and one uppercase letter',
    })
    password: string;
}
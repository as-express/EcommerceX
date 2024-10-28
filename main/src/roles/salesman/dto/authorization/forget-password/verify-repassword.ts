import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class salesmanVerifyAndRepasswordDto {
    @ApiProperty({ example: 'shop@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '1234' })
    @IsNotEmpty()
    code: string;

    @ApiProperty({ example: 'as!3434321dqdS' })
    @MinLength(8, { message: 'Password neeed be min 8 symbols' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
        message:
            'Password must contain at least one number, one symbol, and one uppercase letter',
    })
    password: string;
}

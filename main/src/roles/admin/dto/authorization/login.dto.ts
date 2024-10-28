import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';

export class adminLoginDto {
    @ApiProperty({ example: 'Admin' })
    @IsOptional()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'admin@gmail.com' })
    @IsOptional()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'Qwerty123@@' })
    @MinLength(12, { message: 'Password need min 12 symbols' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
        message:
            'Password must contain at least one number, one symbol, and one uppercase letter',
    })
    password: string;
}

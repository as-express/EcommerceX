import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class adminVerifyDto {
    @ApiProperty({ example: 'admin@gmail.com' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '1234' })
    @IsNotEmpty()
    code: string;

    @ApiProperty({ example: 'NewPassword123**' })
    @MinLength(12, {
        message: 'Password need be min 12 symbols',
    })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
        message:
            'Password must contain at least one number, one symbol, and one uppercase letter',
    })
    password: string;
}

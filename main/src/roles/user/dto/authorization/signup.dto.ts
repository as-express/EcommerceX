import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
    IsIn,
    IsNotEmpty,
    IsOptional,
    Matches,
    MinLength,
} from 'class-validator';

export class userSignup {
    @ApiProperty({ example: 'Alex' })
    @IsNotEmpty()
    surname: string;

    @ApiProperty({ example: 'Mark' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 2001 })
    @IsNotEmpty()
    birth: number;

    @ApiProperty({ example: 'male' })
    @IsNotEmpty()
    @IsIn([Gender.male, Gender.female], {
        message: 'Gender must be either male or female',
    })
    gender: Gender;

    @ApiProperty({ example: 'alex@gmail.com' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '12345678' })
    @MinLength(8, {
        message:
            'Password must be minimum 8 characters and have big and min symbols',
    })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])/, {
        message: 'Password must contain at least one uppercase letter',
    })
    password: string;
}

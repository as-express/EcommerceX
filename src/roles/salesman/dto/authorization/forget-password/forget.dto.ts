import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class salesmanForgetDto {
    @ApiProperty({ example: 'shop@gmail.com' })
    @IsEmail()
    email: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class adminForgetPassword {
    @ApiProperty({ example: 'admin@gmail.com' })
    @IsNotEmpty()
    email: string;
}

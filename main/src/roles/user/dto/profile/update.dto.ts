import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class updateDto {
    @ApiProperty({ example: 'Carl' })
    @IsOptional()
    surname: string;

    @ApiProperty({ example: 'Juvin' })
    @IsOptional()
    username: string;

    @ApiProperty({ example: 1990 })
    @IsOptional()
    birth: number;
}

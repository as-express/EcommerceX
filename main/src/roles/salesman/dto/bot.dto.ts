import { IsNotEmpty, IsOptional } from 'class-validator';

export class botDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    email: string;
}

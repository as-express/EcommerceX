import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class achievementDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    sales: number;

    @IsOptional()
    rating: number;

    @IsOptional()
    subscribers: number;

    @IsNotEmpty()
    @IsString()
    description: string;
}

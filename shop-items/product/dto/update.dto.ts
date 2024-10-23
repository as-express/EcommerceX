import { IsNotEmpty, IsOptional } from 'class-validator';

export class updateProduct {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    price: number;

    @IsOptional()
    @IsNotEmpty()
    model: string;

    @IsOptional()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsNotEmpty()
    color: string[];

    @IsOptional()
    @IsNotEmpty()
    version: string[];

    @IsOptional()
    @IsNotEmpty()
    size: string[];

    @IsOptional()
    @IsNotEmpty()
    weight: string;
}

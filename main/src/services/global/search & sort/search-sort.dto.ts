import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class searchDto {
    @IsNotEmpty()
    title: string;
}

export class searchSortDto {
    @IsOptional()
    @IsString()
    categoryId?: string;

    @IsOptional()
    @IsString()
    sectionId?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    colors?: string[];

    @IsOptional()
    @IsInt()
    @Min(0)
    minPrice?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    maxPrice?: number;

    @IsOptional()
    @IsInt()
    rating?: number;

    @IsOptional()
    @IsString()
    model?: string;
}

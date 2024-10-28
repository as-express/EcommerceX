import { IsNotEmpty, IsOptional } from 'class-validator';

export class fakeUserDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    images: string[];
}

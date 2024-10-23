import { IsNotEmpty } from 'class-validator';

export class shopCreateDto {
    @IsNotEmpty()
    title: string;
}

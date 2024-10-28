import { IsNotEmpty, IsOptional } from 'class-validator';

export class shopUpdateDto {
    @IsNotEmpty()
    title: string;
}

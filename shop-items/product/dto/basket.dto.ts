import { IsNotEmpty } from 'class-validator';

export class addToBasketDto {
    @IsNotEmpty()
    count: number;
}

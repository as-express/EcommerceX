import { IsNotEmpty } from 'class-validator';

export class subscribeDto {
    @IsNotEmpty()
    shopId: string;
}

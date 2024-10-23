import { IsNotEmpty } from 'class-validator';

export class statusDto {
    @IsNotEmpty()
    status: boolean;
}

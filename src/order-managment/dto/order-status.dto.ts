import { IsNotEmpty } from 'class-validator';

export enum Status {
    'Collecting',
    'InWay',
    'Delivered',
    'Canceled',
}

export class orderStatusDto {
    @IsNotEmpty()
    status: Status;
}

import { IsNotEmpty } from 'class-validator';

export enum payment {
    stripe = 'Stripe',
    paypal = 'Paypal',
    yoomoney = 'Yoomoney',
}

export class oneClickBuy {
    @IsNotEmpty()
    count: number;

    @IsNotEmpty()
    paymentMethod: string;
}

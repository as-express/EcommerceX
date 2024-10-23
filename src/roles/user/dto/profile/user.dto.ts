import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export enum Gender {
    Male = 'male',
    Female = 'female',
}

export class userDto {
    @IsNotEmpty()
    surname: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    birth: number;
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    password: string;
}

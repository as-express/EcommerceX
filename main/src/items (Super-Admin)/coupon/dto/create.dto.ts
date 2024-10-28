import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class createDto {
    @SwaggerExample('Welcome')
    @IsNotEmpty()
    title: string;

    @SwaggerExample(1000)
    @IsNotEmpty()
    discount: number;

    @SwaggerExample(10000)
    @IsNotEmpty()
    orderFrom: number;

    @ApiProperty({ example: Date.now() })
    @IsNotEmpty()
    expiration: Date;
}

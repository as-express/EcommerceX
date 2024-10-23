import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class productTableResponse {
    @ApiProperty({ example: 'hsadjfhjsdf1w4jhjk1h' })
    id: string;

    @ApiProperty({ example: 'Galaxy S10' })
    title: string;

    @ApiProperty({ example: ['phone1.png', 'phone2.png'] })
    images: string;

    @ApiProperty({ example: 'mobile-phone' })
    slug: string;

    @ApiProperty({ example: 1000 })
    price: number;

    @ApiProperty({ example: 'Phone' })
    category: string;

    @ApiProperty({ example: 'Elegant' })
    section: string;

    @ApiProperty({ example: 'Samsung' })
    brand: string;

    @SwaggerExample('S10 256GB')
    model: string;

    @SwaggerExample('Elegant Samsung series of phone')
    description: string;

    @ApiProperty({ example: ['Gray', 'Space Gray', 'Gold'] })
    color: string[];

    @ApiProperty({ example: ['6/128', '8/256', '8/512'] })
    version: string[];

    @ApiProperty({ example: '230G' })
    weight: string;
}

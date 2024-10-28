import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class ReviewExample {
    @SwaggerExample('he1g34ggjy3gsada')
    id: string;

    @SwaggerExample(5)
    rating: number;

    @ApiProperty({ example: [] })
    image: string[];

    @SwaggerExample('Good Product')
    text: string;

    @ApiProperty({ example: Date.now() })
    createdAt: Date;

    @SwaggerExample('jklkrj2l13h423s')
    productId: string;

    @SwaggerExample('dksalh3i4h2jjdsj')
    userId: string;
}

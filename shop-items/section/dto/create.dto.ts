import { IsNotEmpty } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class createSection {
    @SwaggerExample('Motorolla')
    @IsNotEmpty()
    title: string;

    @SwaggerExample('kajkjk3h1jghv')
    @IsNotEmpty()
    categoryId: string;
}

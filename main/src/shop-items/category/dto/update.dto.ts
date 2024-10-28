import { IsNotEmpty } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class updateCategory {
    @SwaggerExample('Phone')
    @IsNotEmpty()
    title: string;
}

import { IsNotEmpty } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class createCategory {
    @SwaggerExample('Mobile')
    @IsNotEmpty()
    title: string;
}

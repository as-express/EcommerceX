import { IsNotEmpty } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class createBrand {
    @SwaggerExample('Apple')
    @IsNotEmpty()
    title: string;
}

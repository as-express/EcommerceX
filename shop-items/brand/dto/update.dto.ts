import { IsNotEmpty } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class updateBrand {
    @SwaggerExample('Xiomi')
    @IsNotEmpty()
    title: string;
}

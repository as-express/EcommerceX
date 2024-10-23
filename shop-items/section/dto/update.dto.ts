import { IsNotEmpty } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class updateSection {
    @SwaggerExample('Samnsung')
    @IsNotEmpty()
    title: string;
}

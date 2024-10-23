import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class addressDto {
    @SwaggerExample('41.294575')
    @IsNotEmpty()
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;

    @SwaggerExample('69.249527')
    @IsNotEmpty()
    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;
}

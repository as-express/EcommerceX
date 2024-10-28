import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class addressExample {
    @SwaggerExample('1243124y3f2134fh')
    id: number;

    @SwaggerExample(41.294575)
    latitude: number;

    @SwaggerExample(69.249527)
    longitude: number;

    @SwaggerExample('6789124yjshawerf')
    userId: number;
}

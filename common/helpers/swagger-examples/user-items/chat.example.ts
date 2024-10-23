import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class chatExample {
    @SwaggerExample('1243124y3f2134fh')
    id: number;

    @SwaggerExample(0)
    messageCount: number;

    @SwaggerExample('')
    @ApiProperty({ example: [String] })
    messages: string;

    @SwaggerExample('6789124yjshawerf')
    userId: number;

    @SwaggerExample('uiopk209783hsjdnb')
    salerId: number;

    @SwaggerExample('')
    adminId: number;
}

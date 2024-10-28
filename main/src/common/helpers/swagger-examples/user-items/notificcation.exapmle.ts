import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from 'src/common/decorators/swagger.decorator';

export class item {
    @SwaggerExample('1243124y3f2134fh')
    id: number;

    @SwaggerExample('Welcome to As-Express')
    text: string;

    @ApiProperty({ example: false })
    isRead: boolean;

    @ApiProperty({ example: Date.now() })
    createdAt: Date;

    @SwaggerExample('')
    salerId: string;

    @SwaggerExample('')
    adminId: string;
}

export class notificationExample {
    @SwaggerExample('1243124y3f2134fh')
    id: number;

    @SwaggerExample(1)
    notificationCount: number;

    @ApiProperty({ example: [item] })
    items: item[];

    @SwaggerExample('6789124yjshawerf')
    userId: string;

    @SwaggerExample('')
    salerId: string;

    @SwaggerExample('')
    adminId: string;
}

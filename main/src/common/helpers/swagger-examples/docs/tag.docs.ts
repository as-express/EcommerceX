import { ApiProperty } from '@nestjs/swagger';

export class tagResponce {
    @ApiProperty({ example: 'k2j1kj3b1jb1j23h' })
    id: string;

    @ApiProperty({ example: 'Phone' })
    title: string;

    @ApiProperty({ example: [] })
    products: string[];
}

import { ApiProperty } from '@nestjs/swagger';

export class tokenRes {
    @ApiProperty({ example: 'gwjgweygwyegdw234DA13ih434s' })
    accessToken: string;

    @ApiProperty({ example: 'rtdsgweyg234yegesFSWtkl34ad' })
    refreshToken: string;
}

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

export function SwaggerGenerator(title: string, res: any) {
    return applyDecorators(ApiOperation({ summary: title }), ApiResponse({ status: 200, type: res }));
}

export function SwaggerTag(title: string) {
    return applyDecorators(ApiTags(title));
}

export function SwaggerExample(title: string | number) {
    if (title === 'number') {
        return applyDecorators(ApiProperty({ example: title }));
    }
    if (title !== 'string' && title !== 'number') {
        return applyDecorators(ApiProperty({ example: title }));
    }

    return applyDecorators(ApiProperty({ example: title }));
}

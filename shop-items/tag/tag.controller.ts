import { Controller, Get, Param } from '@nestjs/common';
import { TagsService } from '../../services/global/tags.service';
import { SwaggerTag } from 'src/common/decorators/swagger.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { tagResponce } from 'src/common/helpers/swagger-examples/docs/tag.docs';

@SwaggerTag('Tag')
@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagsService) {}

    @ApiResponse({ status: 200, type: tagResponce })
    @Get(':id')
    async getTagById(@Param('id') id: string) {
        return this.tagService.getById(id);
    }
}

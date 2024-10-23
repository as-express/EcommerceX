import { TagController } from './tag.controller';
import { TagsService } from '../../services/global/tags.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    controllers: [TagController],
    providers: [TagsService, PrismaService],
})
export class TagModule {}

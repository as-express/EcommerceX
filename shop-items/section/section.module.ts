import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryService } from '../category/category.service';
import { FileService } from 'src/libs/file/file.service';
import { AdminService } from 'src/roles/admin/admin.service';

@Module({
    controllers: [SectionController],
    providers: [SectionService, PrismaService, CategoryService, FileService, AdminService],
})
export class SectionModule {}

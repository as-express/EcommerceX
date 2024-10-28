import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { slugGenerator } from 'src/libs/slugify/slugify.util';
import { createSection } from './dto/create.dto';
import { CategoryService } from '../category/category.service';
import { updateSection } from './dto/update.dto';

@Injectable()
export class SectionService {
    constructor(
        private prisma: PrismaService,
        private categoryService: CategoryService,
    ) {}

    async create(dto: createSection) {
        const newSlug = slugGenerator(dto.title);
        const category = await this.categoryService.getOne(dto.categoryId);
        const section = await this.prisma.section.create({
            data: {
                title: dto.title,
                slug: newSlug,
                categoryId: category.id,
            },
        });
        category.sections.push(section);

        return {
            message: 'Created',
            section,
        };
    }

    async getAll() {
        return await this.prisma.section.findMany();
    }

    async getById(id: string) {
        return this.sectionById(id);
    }

    async update(id: string, dto: updateSection) {
        await this.sectionById(id);

        return await this.prisma.section.update({
            where: {
                id,
            },
            data: {
                title: dto.title,
            },
        });
    }

    async delete(id: string) {
        await this.sectionById(id);
        await this.prisma.section.delete({
            where: {
                id,
            },
        });

        return 'Deleted';
    }

    private async sectionById(id: string) {
        const section = await this.prisma.section.findUnique({
            where: {
                id,
            },
        });

        if (!section) throw new NotFoundException('Section is not found');
        return section;
    }
}

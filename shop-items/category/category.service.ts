import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FileService, TYPE } from 'src/libs/file/file.service';
import { slugGenerator } from 'src/libs/slugify/slugify.util';
import { createCategory } from './dto/create.dto';
import { updateCategory } from './dto/update.dto';

@Injectable()
export class CategoryService {
    constructor(
        private prisma: PrismaService,
        private file: FileService,
    ) {}

    async create(dto: createCategory, icon: any) {
        const isOld = await this.prisma.category.findFirst({
            where: {
                title: dto.title,
            },
        });
        if (isOld) throw new BadRequestException('Category is already exist');

        const writedIcon = await this.file.writeFile(TYPE.ICON, icon);
        const generatedSlug = await slugGenerator(dto.title);
        const category = await this.prisma.category.create({
            data: {
                title: dto.title,
                icon: writedIcon,
                slug: generatedSlug,
            },
        });

        return category;
    }

    async getAll() {
        return this.prisma.category.findMany();
    }

    async getOne(id: string) {
        return await this.getById(id);
    }

    async update(id: string, dto: updateCategory) {
        await this.getById(id);

        return await this.prisma.category.update({
            where: {
                id,
            },
            data: {
                title: dto.title,
            },
        });
    }

    async delete(id: string) {
        await this.getById(id);

        await this.prisma.category.delete({
            where: {
                id,
            },
        });

        return 'Deleted Successfull';
    }

    async getCategoryId(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) throw new BadRequestException('Category is not defind');

        return category.id;
    }

    private async getById(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id,
            },
            include: {
                sections: true,
                products: true,
            },
        });
        if (!category) throw new BadRequestException('Category is not defind');

        return category;
    }
}

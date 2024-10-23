import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createBrand } from './dto/create.dto';
import { slugGenerator } from 'src/libs/slugify/slugify.util';
import { FileService, TYPE } from 'src/libs/file/file.service';
import { updateBrand } from './dto/update.dto';

@Injectable()
export class BrandService {
    constructor(
        private prisma: PrismaService,
        private file: FileService,
    ) {}

    async create(dto: createBrand, icon: any) {
        const isOld = await this.prisma.brand.findFirst({
            where: {
                title: dto.title,
            },
        });
        if (isOld) throw new BadRequestException('Category is already exist');

        const writedIcon = await this.file.writeFile(TYPE.ICON, icon);
        const generatedSlug = await slugGenerator(dto.title);
        const brand = await this.prisma.brand.create({
            data: {
                title: dto.title,
                icon: writedIcon,
                slug: generatedSlug,
            },
        });

        return brand;
    }

    async getAll() {
        return this.prisma.brand.findMany();
    }

    async getOne(id: string) {
        return await this.getById(id);
    }

    async update(id: string, dto: updateBrand) {
        await this.getById(id);

        return await this.prisma.brand.update({
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

        await this.prisma.brand.delete({
            where: {
                id,
            },
        });

        return 'Deleted Successfull';
    }

    private async getById(id: string) {
        const brand = await this.prisma.brand.findUnique({
            where: {
                id,
            },
        });
        if (!brand) throw new BadRequestException('Brand is not defind');

        return brand;
    }
}

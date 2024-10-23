import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FileService } from 'src/libs/file/file.service';

@Module({
    controllers: [BrandController],
    providers: [BrandService, PrismaService, FileService],
})
export class BrandModule {}

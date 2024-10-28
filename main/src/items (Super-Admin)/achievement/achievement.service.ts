import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { achievementDto } from './dto/create.dto';
import { FileService, TYPE } from 'src/libs/file/file.service';
import { Achievement } from '@prisma/client';
import { ShopService } from 'src/shop/shop.service';

@Injectable()
export class AchievementService {
    constructor(
        private prisma: PrismaService,
        private file: FileService,
        private shopService: ShopService,
    ) {}

    async newAchievement(dto: achievementDto, img: any): Promise<Achievement> {
        await this.checkAchievement(dto.title);

        const icon = await this.file.writeFile(TYPE.ICON, img);

        const achievement = await this.prisma.achievement.create({
            data: {
                title: dto.title,
                icon,
                sales: dto.sales | 0,
                subscribers: dto.subscribers | 0,
                rating: dto.subscribers | 0,
                description: dto.description,
            },
        });

        return achievement;
    }

    async getAll() {
        return this.prisma.achievement.findMany();
    }

    async getById(id: string) {
        return this.prisma.achievement.findUnique({
            where: {
                id,
            },
        });
    }

    async deleteAchievement() {}

    async updateAchievement() {}

    private async checkAchievement(title: string) {
        const achievement = await this.prisma.achievement.findFirst({
            where: {
                title,
            },
        });

        if (achievement) throw new BadRequestException('Achievement is defined');
        return achievement;
    }
}

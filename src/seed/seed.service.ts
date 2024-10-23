import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SeedService {
    constructor(private prisma: PrismaService) {}

    async staticSeed() {
        await this.prisma.statistic.create({ data: {} });
        await this.prisma.userStatistic.create({ data: {} });
        await this.prisma.salerStatistic.create({ data: {} });
        await this.prisma.orderStatistic.create({ data: {} });
        await this.prisma.productSatistic.create({ data: {} });

        console.log('Statistics created Successfully ✅');
    }

    async userSeed() {
        const users = [];
        for (let i = 0; i < 10; i++) {
            users.push({
                avatar: '/avatars/female.png',
                username: faker.person.firstName(),
                surname: faker.person.lastName(),
                phone: faker.phone.number(),
                email: faker.internet.email,
                gender: 'female',
                birth: faker.date,
                password: faker.internet.password(),
            });
        }

        await this.prisma.user.createMany({
            data: users,
        });

        console.log('Databse was seed by 10 users 👤✅');
    }
}

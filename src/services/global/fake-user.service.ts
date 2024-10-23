import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'prisma/prisma.service';
import { adminSignupDto } from 'src/roles/admin/dto/authorization/signup.dto';
import { salesmanSignupDto } from 'src/roles/salesman/dto/authorization/signup.dto';
import { userSignup } from 'src/roles/user/dto/authorization/signup.dto';

@Injectable()
export class FakeUserService {
    constructor(private prisma: PrismaService) {}

    async newFake(dto: userSignup) {
        const hashP = await hash(dto.password);

        await this.prisma.fakeUser.create({
            data: {
                username: dto.username,
                surname: dto.surname,
                email: dto.email,
                gender: dto.gender,
                birth: dto.birth,
                password: hashP,
            },
        });
    }

    async newAdminFake(dto: adminSignupDto) {
        await this.prisma.fakeUser.create({
            data: {
                username: dto.username,
                email: dto.email,
                password: await hash(dto.password),
            },
        });
    }

    async newGoogleFake(req: any) {
        const fakerPassword = faker.internet.password();
        const user = await this.prisma.user.create({
            data: {
                username: req.user.firstName,
                surname: req.user.lastName,
                email: req.user.email,
                avatar: 'avatars/acc.png',
                password: await hash(fakerPassword),
            },
        });

        return user;
    }

    async newSalesmanFake(dto: salesmanSignupDto) {
        const hashP = await hash(dto.password);
        const fakeUser = await this.prisma.fakeUser.create({
            data: {
                username: dto.title,
                email: dto.email,
                password: hashP,
            },
        });

        return fakeUser;
    }

    async checkFakeUser(email: string) {
        const fake = await this.prisma.fakeUser.findFirst({
            where: {
                email: email,
            },
        });
        if (!fake) {
            throw new NotFoundException('Fake user is not defined');
        }

        return fake;
    }

    async removeUser(id: string) {
        await this.prisma.fakeUser.delete({
            where: {
                id,
            },
        });
    }
}

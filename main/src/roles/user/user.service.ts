import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'prisma/prisma.service';
import { updateDto } from './dto/profile/update.dto';
import { userDto } from './dto/profile/user.dto';
import { addressDto } from './dto/profile/address.dto';
import { FileService, TYPE } from 'src/libs/file/file.service';
import { FakeUser } from '@prisma/client';
import { CouponService } from 'src/services/roles/coupon.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private file: FileService,
        private couponService: CouponService,
    ) {}

    async newUser(fake: FakeUser) {
        const user = await this.prisma.user.create({
            data: {
                username: fake.username,
                surname: fake.surname,
                gender: fake.gender,
                email: fake.email,
                password: fake.password,
                avatar: '/uploads/avatars/acc.png',
            },
        });

        return user;
    }

    async getById(id: string) {
        return await this.prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                subscriptions: true,
            },
        });
    }

    async addUser(dto: userDto) {
        let ava;
        if (dto.gender === 'male') {
            ava = '/uploads/avatars/male.png';
        } else {
            ava = '/uploads/avatars/female.png';
        }

        const hashP = await hash(dto.password);
        const user = await this.prisma.user.create({
            data: {
                surname: dto.surname,
                username: dto.username,
                avatar: ava,
                birth: dto.birth,
                gender: dto.gender,
                password: hashP,
            },
        });

        return user;
    }

    async checkEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async addAddress(id: string, dto: addressDto) {
        const userAddress = await this.prisma.address.findMany({
            where: {
                userId: id,
            },
        });
        const count = userAddress.length;
        if (count === 3) throw new BadRequestException('Your address limit is end');

        await this.prisma.address.create({
            data: {
                latitude: dto.latitude,
                longitude: dto.longitude,
                userId: id,
            },
        });

        return {
            count,
            userAddress,
        };
    }

    async deleteAddress(userId: string, id: string) {
        await this.prisma.address.delete({
            where: {
                id,
            },
        });

        return true;
    }

    async updateProfile(id: string, dto: updateDto, avatar?: any) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new BadRequestException('User is not defined');
        }

        await this.prisma.user.updateMany({
            where: {
                id,
            },
            data: dto,
        });

        return 'Updated';
    }

    async uploadAvatar(id: string, file: any) {
        const writeFile = await this.file.writeFile(TYPE.AVATAR, file);
        const user = await this.getById(id);
        if (
            user.avatar !== '/uploads/avatars/male.png' &&
            user.avatar !== '/uploads/avatars/female.png' &&
            user.avatar !== '/uploads/avatars/acc.png'
        ) {
            await this.file.removeFile(user.avatar);
        }

        const upload = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                avatar: writeFile,
            },
        });

        if (!upload) {
            throw new BadRequestException('Please check your code ');
        }

        return 'Avatar Upload';
    }

    async getProfile(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new BadRequestException('User is not defined');
        }

        return user;
    }
    async oldUserCheck(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new BadRequestException('User with this email is not defined');
        }
        return email;
    }

    async orders(id: string) {
        const orders = await this.prisma.order.findMany({
            where: {
                userId: id,
            },
        });

        const count = orders.length;
        return {
            count,
            orders,
        };
    }
    async orderById(id: string) {
        return await this.prisma.orderItems.findUnique({
            where: {
                id,
            },
        });
    }

    async checkOrder(userId: string) {
        const order = await this.prisma.order.findFirst({
            where: {
                userId,
            },
            include: {
                orders: true,
            },
        });
        if (!order) throw new BadRequestException('Order is not defined');

        return order;
    }

    async favorites(id: string) {
        return this.prisma.favorite.findFirst({
            where: {
                userId: id,
            },
        });
    }

    async basket(id: string) {
        return this.prisma.basket.findFirst({
            where: {
                userId: id,
            },
        });
    }

    async reviews(id: string) {
        return this.prisma.review.findMany({
            where: {
                userId: id,
            },
        });
    }

    async addresses(id: string) {
        const addresses = await this.prisma.address.findMany({
            where: {
                userId: id,
            },
        });

        const count = addresses.length;
        return {
            count,
            addresses,
        };
    }

    async chats(id: string) {
        return this.prisma.chat.findMany({
            where: {
                userId: id,
            },
        });
    }

    async chatById(id: string) {
        return await this.prisma.chat.findUnique({
            where: {
                id,
            },
            include: {
                messages: true,
            },
        });
    }

    async setAvatar(gender: string) {
        let avatar;
        if (gender === 'male') {
            avatar = 'uploads/avatars/male.png';
            return avatar;
        } else if (gender === 'female') {
            avatar = 'uploads/avatars/female.png';
            return avatar;
        }
    }

    async coupons(id: string) {
        return this.couponService.getUserCoupons(id);
    }
}

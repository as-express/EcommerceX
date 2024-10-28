import { Injectable, NotFoundException } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OtpService {
    constructor(private prisma: PrismaService) {}

    async checkOtp(email: string) {
        const otp = await this.prisma.emailOtp.findFirst({
            where: {
                email: email,
            },
        });
        if (!otp) {
            throw new NotFoundException('Otp is not found');
        }

        return otp;
    }

    async removeOtp(email: string) {
        // const otp = await this.prisma.emailOtp.findFirst({
        //     where: {
        //         email: email,
        //     },
        // });
        // await this.prisma.emailOtp.delete({
        //     where: {
        //         id: otp.id,
        //     },
        // });

        console.log('SASA');
    }
}

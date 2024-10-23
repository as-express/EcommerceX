import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { NodemailerController } from './nodemailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    imports: [
        ConfigModule,
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
        }),
    ],
    controllers: [NodemailerController],
    providers: [NodemailerService, PrismaService],
})
export class NodemailerModule {}

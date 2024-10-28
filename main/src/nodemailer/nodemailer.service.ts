import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NodemailerService {
    constructor(
        private readonly mailService: MailerService,
        private prisma: PrismaService,
    ) {}

    async sendButton(email: string) {
        const url = `http://localhost/as-express/email/${email}`;

        this.mailService.sendMail({
            from: 'As-Faberic <your_email>',
            to: `${email}`,
            subject: `Your Verication Code`,
            html: `
              <a href="${url}">Verify Your Email</a>,
             `,
        });
    }

    async sendPassword(email: string, password: string) {
        this.mailService.sendMail({
            from: 'As-Faberic <your_email>',
            to: `${email}`,
            subject: `Your Verication Code`,
            html: `
            <html>
                <head>
                    <style>
                        /* Base styles */
                        body {
                            font-family: 'Roboto', sans-serif; /* Changed font family */
                            background-color: #f0f0f0;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                            position: relative;
                            overflow: hidden;
                        }
                        .header {
                            background-color: #007bff;
                            color: #fff;
                            padding: 15px;
                            text-align: center;
                            border-top-left-radius: 10px;
                            border-top-right-radius: 10px;
                            font-size: 28px;
                            margin-bottom: 20px;
                        }
                        .logo {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .logo img {
                            width: 200px;
                            height: auto;
                        }
                        .password {
                            text-align: center;
                            font-size: 36px;
                            margin-bottom: 30px;
                            padding: 20px;
                            background-color: #007bff;
                            color: #fff;
                            border-radius: 10px;
                            animation: scaleUp 1s ease-in-out infinite alternate;
                        }
                        @keyframes scaleUp {
                            from {
                                transform: scale(1);
                            }
                            to {
                                transform: scale(1.1);
                            }
                        }
                        .content {
                            padding: 0 20px;
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .footer {
                            background-color: #007bff;
                            color: #fff;
                            text-align: center;
                            padding: 15px;
                            border-bottom-left-radius: 10px;
                            border-bottom-right-radius: 10px;
                            font-size: 14px;
                        }
                    </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2>Your New Password</h2>
                            </div>
                            <div class="logo">
                                <img src="https://i.ytimg.com/vi/LFBjUbDB_OA/maxresdefault.jpg" alt="Logo">
                            </div>
                            <div class="password">
                                <!-- Assuming 'password' is the actual password -->
                                ${password}
                            </div>
                            <div class="content">
                                <p>This email contains your new password. Please use it to log in to your account.</p>
                                <p style="font-style: italic;">This email was sent from As-Fabric. Please do not reply to this email.</p>
                            </div>
                            <div class="footer">
                                <p>&copy; ${new Date().getFullYear()} As-Fabric. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>`,
        });

        console.log('SEnd');
    }

    async removeOtp(email: string) {
        const otp = await this.prisma.emailOtp.findFirst({
            where: {
                email: email,
            },
        });

        await this.prisma.emailOtp.delete({
            where: {
                id: otp.id,
            },
        });

        console.log('Otp code time is end');
    }

    async sendMail(email: string) {
        function random() {
            let randomcode = '';
            for (let i = 0; i < 4; i++) {
                randomcode += Math.floor(Math.random() * 10);
            }
            return randomcode;
        }
        const verificationCode: string = random();

        this.mailService.sendMail({
            from: 'As-Faberic <your_email>',
            to: `${email}`,
            subject: `Your Verication Code`,
            html: `
            <html>
            <head>
                <style>
                    /* Base styles */
                    body {
                        font-family: 'Roboto', sans-serif; /* Changed font family */
                        background-color: #f0f0f0;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                        position: relative;
                        overflow: hidden;
                    }
                    .header {
                        background-color: #007bff;
                        color: #fff;
                        padding: 15px;
                        text-align: center;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        font-size: 28px;
                        margin-bottom: 20px;
                    }
                    .logo {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .logo img {
                        width: 200px;
                        height: auto;
                    }
                    .verification-code {
                        text-align: center;
                        font-size: 36px;
                        margin-bottom: 30px;
                    }
                    .verification-code span {
                        display: inline-block;
                        font-weight: bold;
                        font-size: 48px;
                        line-height: 1;
                        padding: 10px 20px;
                        margin: 5px;
                        border-radius: 5px;
                        background-color: #007bff;
                        color: #fff;
                        animation: scaleUp 1s ease-in-out infinite alternate;
                    }
                    @keyframes scaleUp {
                        from {
                            transform: scale(1);
                        }
                        to {
                            transform: scale(1.1);
                        }
                    }
                    .content {
                        padding: 0 20px;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .footer {
                        background-color: #007bff;
                        color: #fff;
                        text-align: center;
                        padding: 15px;
                        border-bottom-left-radius: 10px;
                        border-bottom-right-radius: 10px;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Your Verification Code</h2>
                    </div>
                    <div class="logo">
                        <img src="https://i.ytimg.com/vi/LFBjUbDB_OA/maxresdefault.jpg" alt="Logo">
                    </div>
                    <div class="verification-code">
                        <!-- Assuming 'verificationCode' is the actual code -->
                        <span>${verificationCode.charAt(0)}</span>
                        <span>${verificationCode.charAt(1)}</span>
                        <span>${verificationCode.charAt(2)}</span>
                        <span>${verificationCode.charAt(3)}</span>
                    </div>
                    <div class="content">
                        <p>This email contains your verification code. Please use it for verification.</p>
                        <p style="font-style: italic;">This email was sent from As-Fabric. Please do not reply to this email.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} As-Fabric. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        });

        await this.prisma.emailOtp.create({
            data: {
                email: email,
                code: verificationCode,
            },
        });

        setTimeout(() => {
            this.removeOtp(email);
        }, 120000);

        return 'Success';
    }
}

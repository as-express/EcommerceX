import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminGuard } from './common/guards/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from './common/decorators/auth.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiBearerAuth('JWT-auth')
    @Get()
    @Auth()
    async addAdmin() {
        // return this.appService.addAdmin();

        console.log('AAAAAAAAAA');
    }
}

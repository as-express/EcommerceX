import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminService } from 'src/roles/admin/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private adminService: AdminService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const id = req.user.id;

        if (!id) {
            throw new BadRequestException('User not defind');
        }

        const admin = await this.adminService.getById(id);
        if (!admin) {
            throw new BadRequestException('You are not have rights fot it');
        }
        return true;
    }
}

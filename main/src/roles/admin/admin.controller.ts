import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SwaggerGenerator, SwaggerTag } from 'src/common/decorators/swagger.decorator';

@SwaggerTag('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
}

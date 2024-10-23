import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SalesmanService } from 'src/roles/salesman/salesman.service';

@Injectable()
export class SalesmanGuard implements CanActivate {
    constructor(private salesmanService: SalesmanService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const id = req.user.id;

        if (!id) {
            throw new BadRequestException('User not defined');
        }

        try {
            const salesman = await this.salesmanService.getById(id);
            if (!salesman) {
                throw new BadRequestException('You do not have rights for this');
            }
        } catch (error) {
            throw new BadRequestException('An error occurred while checking rights');
        }

        return true;
    }
}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminService } from 'src/roles/admin/admin.service';
import { SalesmanService } from 'src/roles/salesman/salesman.service';
import { UserService } from 'src/roles/user/user.service';

@Injectable()
export class jwtStregy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
        private adminService: AdminService,
        private salesmanService: SalesmanService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT'),
        });
    }
    //sasa

    async validate({ id }) {
        console.log(`Validating user with ID: ${id}`);

        const user = await this.userService.getById(id);
        if (user) {
            return user;
        }

        const admin = await this.adminService.getById(id);
        if (admin) {
            return admin;
        }

        const salesman = await this.salesmanService.getById(id);
        if (salesman) {
            return salesman;
        }

        throw new UnauthorizedException('User is not defined');
    }
}

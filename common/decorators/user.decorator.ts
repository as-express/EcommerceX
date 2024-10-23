import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Salesman, User } from '@prisma/client';

export const userDecorator = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    return data ? user[data] : user;
});

export const salesmanDecorator = createParamDecorator((data: keyof Salesman, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const salesman = req.user;

    if (!salesman) {
        throw new NotFoundException('Salesman data not available');
    }

    return data ? salesman[data] : salesman;
});

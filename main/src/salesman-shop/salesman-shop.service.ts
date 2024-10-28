import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SalesmanShopService {
    constructor(private prisma: PrismaService) {}

    async newShop() {}

    async getShops() {}

    async getShop() {}

    async updateShop() {}
}

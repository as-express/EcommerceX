import { Module } from '@nestjs/common';
import { SalesmanShopService } from './salesman-shop.service';
import { SalesmanShopController } from './salesman-shop.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    imports: [SalesmanShopModule],
    controllers: [SalesmanShopController],
    providers: [SalesmanShopService, PrismaService, SalesmanShopService],
})
export class SalesmanShopModule {}

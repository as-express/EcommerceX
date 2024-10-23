import { Controller } from '@nestjs/common';
import { SalesmanShopService } from './salesman-shop.service';

@Controller('salesman-shop')
export class SalesmanShopController {
    constructor(private readonly salesmanShopService: SalesmanShopService) {}
}

import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FileService } from 'src/libs/file/file.service';
import { TagsService } from 'src/services/global/tags.service';
import { CategoryService } from '../category/category.service';
import { BasketService } from 'src/services/roles/basket.service';
import { FavoriteService } from 'src/services/roles/favorite.service';
import { UserService } from 'src/roles/user/user.service';
import { SalesmanService } from 'src/roles/salesman/salesman.service';
import { ShopService } from 'src/shop/shop.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderService } from 'src/services/roles/order.service';
import { CouponService } from 'src/services/roles/coupon.service';
import { Cache, CacheModule } from '@nestjs/cache-manager';
import { NewProductsService } from 'src/services/global/new-products.service';
import { SearchSortService } from 'src/services/global/search & sort/search-sort.service';
import { SalesmanShopService } from 'src/services/roles/salesman/shop.service';

@Module({
    imports: [
        CacheModule.register(),
        ClientsModule.register([
            {
                name: 'PAYMENT_CLIENT',
                transport: Transport.TCP,
                options: {
                    port: 4000,
                },
            },
        ]),
    ],
    controllers: [ProductController],
    providers: [
        ProductService,
        PrismaService,
        ShopService,
        SalesmanService,
        CouponService,
        FileService,
        TagsService,
        CategoryService,
        BasketService,
        FavoriteService,
        OrderService,
        SalesmanShopService,
        NewProductsService,
        SearchSortService,
        UserService,
    ],
})
export class ProductModule {}

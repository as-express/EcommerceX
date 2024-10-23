import {
    BadRequestException,
    HttpException,
    Inject,
    Injectable,
    NotFoundException,
    UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createProduct } from './dto/create.dto';
import { FileService, TYPE } from 'src/libs/file/file.service';
import { slugGenerator } from 'src/libs/slugify/slugify.util';
import { TagsService } from 'src/services/global/tags.service';
import { CategoryService } from '../category/category.service';
import { UserService } from 'src/roles/user/user.service';
import { BasketService } from 'src/services/roles/basket.service';
import { FavoriteService } from 'src/services/roles/favorite.service';
import { addToBasketDto } from './dto/basket.dto';
import { ShopService } from 'src/shop/shop.service';
import { title } from 'process';
import { ClientProxy } from '@nestjs/microservices';
import { oneClickBuy } from './dto/one-click-buy.dto';
import { Product } from '@prisma/client';
import { OrderService } from 'src/services/roles/order.service';
import { CouponService } from 'src/services/roles/coupon.service';
import { updateProduct } from './dto/update.dto';
import { statusDto } from './dto/product-status.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { NewProductsService } from 'src/services/global/new-products.service';
import { searchDto, searchSortDto } from 'src/services/global/search & sort/search-sort.dto';
import { SearchSortService } from 'src/services/global/search & sort/search-sort.service';

@Injectable()
export class ProductService {
    constructor(
        @Inject('PAYMENT_CLIENT') private paymentClient: ClientProxy,
        private prisma: PrismaService,
        private file: FileService,
        private tagService: TagsService,
        private ctgService: CategoryService,
        private userService: UserService,
        private basketService: BasketService,
        private favoriteService: FavoriteService,
        private shopService: ShopService,
        private orderService: OrderService,
        private couponService: CouponService,
        private newProductService: NewProductsService,
        private searchSortService: SearchSortService,
    ) {}

    async newProduct(dto: createProduct, i1: any, i2?: any, i3?: any, i4?: any, i5?: any): Promise<Product> {
        const shop = await this.shopService.getShop(dto.shopId);
        const isCtg = await this.checkCategory(dto.category);
        const isSection = await this.checkSection(dto.section);
        const isBrand = await this.checkBrand(dto.brand);
        const file1 = await this.file.writeFile(TYPE.IMAGE, i1);
        const slug = slugGenerator(dto.title);
        const product = await this.prisma.product.create({
            data: {
                title: dto.title,
                images: [file1],
                slug: slug,
                price: dto.price,
                tags: dto.tag,
                categoryId: isCtg.id,
                sectionId: isSection.id,
                brandId: isBrand.id,
                model: dto.model,
                description: dto.description,
                color: dto.color,
                version: dto.version,
                size: dto.size,
                weight: dto.weight,
                shopId: dto.shopId,
            },
        });
        shop.productsCount += 1;
        await shop.products.push(product);
        if (i2) {
            const file2 = await this.file.writeFile(TYPE.IMAGE, i2);
            product.images.push(file2);
            if (i3) {
                const file3 = await this.file.writeFile(TYPE.IMAGE, i3);
                product.images.push(file3);
                if (i4) {
                    const file4 = await this.file.writeFile(TYPE.IMAGE, i4);
                    product.images.push(file4);
                    if (i5) {
                        const file2 = await this.file.writeFile(TYPE.IMAGE, i2);
                        product.images.push(file2);
                    }
                }
            }
        }
        await this.checkTag(dto.tag, product);
        await this.updateCategoryAndOthers(dto.category, dto.section, dto.brand, product);
        return product;
    }

    async getTopProducts() {
        const products = await this.prisma.product.findMany({
            orderBy: {
                rating: 'desc',
                saleCount: 'desc',
            },
        });
        return this.productsStructure(products);
    }
    async getNewProducts() {
        return this.newProductService.getNewProducts();
    }
    async getAll(skip: number, take: number) {
        const products = await this.prisma.product.findMany({
            skip: skip,
            take: take,
        });
        return this.productsStructure(products);
    }

    async getById(id: string) {
        const product = await this.checkProduct(id);

        const category = await this.ctgService.getCategoryId(product.categoryId);
        const categoryId = category.toString();

        const sameProducts = await this.prisma.product.findMany({
            where: {
                categoryId,
            },
            take: 6,
        });
        const shopObject = await this.prisma.shop.findUnique({
            where: {
                id: product.shopId,
            },
        });

        const shop = {
            id: shopObject.id,
            avatar: shopObject.avatar,
            title: shopObject.title,
            rating: shopObject.shopRating,
            subscribers: shopObject.subscribersCount,
        };

        return {
            product: product,
            sameProducts: this.productsStructure(sameProducts),
            shop: shop,
        };
    }

    async searchProduct(dto: searchDto) {
        return this.searchSortService.search(dto.title);
    }

    async sorting(dto: searchSortDto) {
        return this.searchSortService.filtering(dto);
    }

    async updateProduct(id: string, dto: updateProduct): Promise<Product> {
        const product = await this.prisma.product.update({
            where: {
                id,
            },
            data: dto,
        });

        return product;
    }
    async changeProductStatus(id: string, dto: statusDto): Promise<Product> {
        const product = await this.prisma.product.update({
            where: {
                id,
            },
            data: {
                isActive: dto.status,
            },
        });

        return product;
    }

    async pushToBasket(userId: string, id: string, dto: addToBasketDto) {
        const product = await this.getById(id);
        const isHave = await this.basketService.checkItem(product.product.id);

        if (isHave) {
            await this.basketService.removeItem(isHave.id);
            return product;
        }

        const count = dto.count;
        let i = 1;
        let price = product.product.price;
        const totalPrice = product.product.price;

        while (i < count) {
            price += totalPrice;
            i++;
        }

        const item = await this.prisma.basketItems.create({
            data: {
                productId: product.product.id,
                productsCount: count,
                price: price,
            },
        });

        await this.basketService.updateBasket(userId, count, totalPrice, item);
        return product;
    }

    async pushToFavorite(userId: string, productId: string) {
        const product = await this.getById(productId);
        const isHave = await this.favoriteService.checkProduct(userId, productId);

        if (isHave) {
            await this.favoriteService.removeProduct(userId, productId);

            return product;
        }

        await this.favoriteService.addProduct(userId, productId);
        return product;
    }

    async getShop(id: string) {
        return this.shopService.getShop(id);
    }

    async buyOneClick(userId: string, productId: string, dto: oneClickBuy, couponId?: string) {
        const product = await this.checkProduct(productId);
        const coupon = await this.couponService.getCoupon(couponId);
        let totalPrice = product.price * dto.count;
        const isMatchPrice = coupon.orderFrom <= totalPrice;

        try {
            if (coupon && isMatchPrice) {
                totalPrice -= coupon.discount;
            }

            const paymentMethod = dto.paymentMethod.toLowerCase();
            const paymentHandler = {
                paypal: async () => {
                    return await this.paymentClient.send('paypal', {
                        totalPrice,
                    });
                },
                stripe: async () => {
                    return await this.paymentClient.send('stripe', {
                        totalPrice,
                    });
                },
                yoomoney: async () => {
                    return await this.paymentClient.send('yoomoney', {
                        totalPrice,
                    });
                },
            };

            if (paymentHandler[paymentMethod]) {
                const payment = await paymentHandler[paymentMethod]();

                const item = await this.orderService.addItem(userId, product, totalPrice, dto);

                return item;
            }

            return null;
        } catch (error) {
            console.error('Error processing payment:', error);
            throw new Error('Payment processing failed');
        }
    }

    private productsStructure(products: Product[]) {
        for (const product of products) {
            return {
                id: product.id,
                title: product.title,
                images: product.images,
                price: product.price,
                oldPrice: product.oldPrice,
                rating: product.rating,
                saleCount: product.saleCount,
            };
        }
    }

    private async checkCategory(title: string) {
        const category = await this.prisma.category.findFirst({
            where: {
                title,
            },
            include: {
                products: true,
            },
        });
        if (!category) throw new BadRequestException('Category is not defined');
        const id = category.id;
        return {
            id,
            category,
        };
    }

    private async checkProduct(id: string) {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
            },
        });
        if (!product) throw new NotFoundException('Product is not defind');
        return product;
    }

    private async checkSection(title: string) {
        const section = await this.prisma.section.findFirst({
            where: {
                title,
            },
            include: {
                products: true,
            },
        });
        if (!section) throw new BadRequestException('Section is not defind');
        const id = section.id;
        return {
            id,
            section,
        };
    }
    private async checkBrand(title: string) {
        const brand = await this.prisma.brand.findFirst({
            where: {
                title,
            },
            include: {
                products: true,
            },
        });
        if (!brand) throw new BadRequestException('Brand is not defind');
        const id = brand.id;
        return {
            id,
            brand,
        };
    }

    private async updateCategoryAndOthers(ctg: string, sec: string, brand: string, product: any) {
        const isCtg = await this.checkCategory(ctg);
        const isSection = await this.checkSection(sec);
        const isBrand = await this.checkBrand(brand);

        isCtg.category.productCount + 1;
        isSection.section.productsCount + 1;
        isBrand.brand.productCount + 1;

        isCtg.category.products.push(product);
        isSection.section.products.push(product);
        isBrand.brand.products.push(product);
    }

    private async checkTag(titles: string[], product: Product) {
        for (const title of titles) {
            let tag = await this.tagService.checkTag(title);

            if (tag === null) {
                tag = await this.tagService.newTag(title);
            }

            await this.tagService.updateTag(title, product);
        }
    }
}

/// Achievement
// Opportunity = Возможность

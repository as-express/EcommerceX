import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FileService } from 'src/libs/file/file.service';
import { CacheModule } from '@nestjs/cache-manager'; // Import CacheModule
import { redisStore } from 'cache-manager-redis-yet';

@Module({
    imports: [
        // CacheModule.register({
        //     // Your Redis configuration can be added here if needed
        //     store: redisStore, // if you're using a specific store
        //     host: 'redis',
        //     port: 6379,
        //     isGlobal: true, // Make it global if you want to use it in other modules
        // }),
    ],
    controllers: [CategoryController],
    providers: [CategoryService, PrismaService, FileService],
})
export class CategoryModule {}

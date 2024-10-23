import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import 'colors';
dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('as-express');
    app.use(cookieParser());
    app.enableCors({
        origin: ['http://localhost:5000'],
        credentials: true,
        exposedHeaders: 'set-cookie',
    });

    const cfg = new DocumentBuilder()
        .setTitle('As_Express')
        .setDescription('The Rest-api Documentation')
        .setVersion('1.0.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth',
        )
        .build();

    const doc = SwaggerModule.createDocument(app, cfg);
    SwaggerModule.setup('/as-express/docs', app, doc);

    await app.listen(process.env.PORT || 3000);
}

bootstrap();

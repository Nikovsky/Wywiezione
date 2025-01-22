import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { AppDataSource } from './orm';
import * as bodyParser from 'body-parser';
import 'dotenv/config';

async function bootstrap() {
    // Initialize TypeORM DataSource and synchronize schema
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('Database connection initialized.');
        }
        if (AppDataSource.options.synchronize) {
            console.log('Synchronizing database schema...');
            await AppDataSource.synchronize();
            console.log('Database schema synchronized.');
        }
    } catch (error) {
        console.error('Error during database initialization:', error);
        process.exit(1);
    }

    // Create the NestJS application
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // Middleware setup
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Start the server
    await app.listen(process.env.PORT ?? 5000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//EOF
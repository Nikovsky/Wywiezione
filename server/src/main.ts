import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(process.env.PORT ?? 5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//EOF
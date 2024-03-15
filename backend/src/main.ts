import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  console.log(process.env.SECRET);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3005);
}
bootstrap();

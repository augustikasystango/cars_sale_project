import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //removes any properties that are not defined in the DTO (Data Transfer Object) from the incoming request data. This helps to prevent unwanted or malicious data from being processed by the application.
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

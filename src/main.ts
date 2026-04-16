import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //this string is used to encrypt the cookie, so it should be a long and random string in a real application. In this example, we are using a simple string for demonstration purposes.
  app.use(cookieSession({
    keys: ['asdfwdhdjhdhdsd']
  }));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //removes any properties that are not defined in the DTO (Data Transfer Object) from the incoming request data. This helps to prevent unwanted or malicious data from being processed by the application.
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

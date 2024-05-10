import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }), //CONFIGURACION INICIAL PARA ARMAR LOS DTOs CON LOS VALIDATION PIPES
  );
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // build and serve swagger docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auth API')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(process.env.port || 8080);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 2504);
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Setting API Path
  const apiPath = 'api';
  app.setGlobalPrefix(apiPath);

  // Swagger Options
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Sistema de Gerenciamento de Tasks API')
    .setDescription('API que oferece endpoints para um sistema de gerenciamento de tasks, criada com NestJS, utiliza um banco de dados PostgreSQL, ambos em containers Docker.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // Swagger path: http://localhost:2504/api/docs
  SwaggerModule.setup(`${apiPath}/docs`, app, document);

  await app.listen(process.env.PORT ?? 2504);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const ROUTE_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(ROUTE_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('File Manager')
    .setDescription('File Manager Web API for Angular Application')
    .setVersion('1.0')
    .addTag('system')
    .addTag('file')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Microservice Infra Boilerplate')
    .setDescription('Microservice Infra Boilerplate')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // TODO: change the path to the docs
  SwaggerModule.setup('docs', app, document);

  const yaml = require('js-yaml');
  const outPath = join(__dirname, '..', '..', 'openapi.yaml');
  writeFileSync(outPath, yaml.dump(document), 'utf8');

  await app.listen(process.env.API_PORT ?? 3000);
  console.log(`Backend is running on: http://localhost:${process.env.API_PORT ?? 3000}`);
  console.log(`Swagger is running on: http://localhost:${process.env.API_PORT ?? 3000}/docs`);
}
bootstrap();

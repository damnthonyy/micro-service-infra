import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend Microservice Infra Boilerplate')
    .setDescription('Backend Microservice Infra Boilerplate')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${process.env.API_PORT || 3000}`, 'Local development server')
    .addTag('users', 'User management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('docs', app, document);

  
  const yaml = require('js-yaml');
  const outPath = join(__dirname, '..', 'openapi.yaml');
  writeFileSync(outPath, yaml.dump(document), 'utf8');
  console.log(`✅ OpenAPI spec exported to: ${outPath}`);

  await app.listen(process.env.API_PORT || 3000);
  console.log(`🚀 Server running on: http://localhost:${process.env.API_PORT || 3000}`);
  console.log(`🔗 Swagger UI: http://localhost:${process.env.API_PORT || 3000}/docs`);
}
bootstrap();


import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import * as crypto from 'crypto';

if (!(global as any).crypto) {
  (global as any).crypto = crypto;
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('DB_HOST') ?? 'db-microservice-infra-boilerplate',
        port: parseInt(cfg.get<string>('DB_PORT') ?? '5432', 10),
        username: cfg.get<string>('DB_USER') ?? cfg.get<string>('POSTGRES_USER'),
        password: cfg.get<string>('DB_PASS') ?? cfg.get<string>('POSTGRES_PASSWORD'),
        database: cfg.get<string>('DB_NAME') ?? cfg.get<string>('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true, // TODO: remove in production
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

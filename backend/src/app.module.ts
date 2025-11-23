import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RootController } from './root.controller';
import { ProductController } from './adapters/inbound/http/product/product.controller';
import { UserController } from './adapters/inbound/http/user/user.controller';
import { UserEntity } from './infra/typeorm/user.typeorm.entity';
import { ProductTypeormEntity } from './infra/typeorm/product.typeorm.entity';
import { UserRepositoryPg } from './infra/repositories/user.repository.pg';
import { ProductRepositoryPg } from './infra/repositories/product.repository.pg';
import { CreateUserUsecase } from './application/usecases/user/create-user.usecase';
import { UpdateUserUsecase } from './application/usecases/user/update-user.usecase';
import { DeleteUserUsecase } from './application/usecases/user/delete-user.usecase';
import { ValidateUserUsecase } from './application/usecases/user/validate-user.usecase';
import { CreateProductUsecase } from './application/usecases/product/create-product.usecase';
import { UpdateProductUsecase } from './application/usecases/product/update-product.usecase';
import { DeleteProductUsecase } from './application/usecases/product/delete-product.usecase';
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
    TypeOrmModule.forFeature([UserEntity, ProductTypeormEntity]),
  ],
  controllers: [RootController, ProductController, UserController],
  providers: [
    {
      provide: 'UserRepository', // Token used for injection
      useClass: UserRepositoryPg,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryPg,
    },
    CreateUserUsecase,
    UpdateUserUsecase,
    DeleteUserUsecase,
    ValidateUserUsecase,
    CreateProductUsecase,
    UpdateProductUsecase,
    DeleteProductUsecase,
  ],
})
export class AppModule { }

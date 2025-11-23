import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductTypeormEntity as ProductEntityPg } from "../typeorm/product.typeorm.entity";
import { ProductEntity as ProductDomainEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductMapper } from "../mappers/product.mapper";

@Injectable()
export class ProductRepositoryPg implements ProductRepository {
    constructor(
        @InjectRepository(ProductEntityPg)
        private readonly productRepository: Repository<ProductEntityPg>
    ) { }

    async findById(id: string): Promise<ProductDomainEntity | null> {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) return null;
        return ProductMapper.toDomain(product);
    }

    async findAll(): Promise<ProductDomainEntity[]> {
        const products = await this.productRepository.find();
        return products.map(ProductMapper.toDomain);
    }

    async create(product: ProductDomainEntity): Promise<ProductDomainEntity> {
        const entity = ProductMapper.toPersistence(product);
        const savedProduct = await this.productRepository.save(entity);
        return ProductMapper.toDomain(savedProduct);
    }

    async update(product: ProductDomainEntity): Promise<ProductDomainEntity> {
        const entity = ProductMapper.toPersistence(product);
        const savedProduct = await this.productRepository.save(entity);
        return ProductMapper.toDomain(savedProduct);
    }

    async save(product: ProductDomainEntity): Promise<ProductDomainEntity> {
        return this.create(product);
    }

    async delete(id: string): Promise<ProductDomainEntity> {
        const product = await this.findById(id);
        if (!product) throw new Error("Product not found");
        await this.productRepository.delete(id);
        return product;
    }
}

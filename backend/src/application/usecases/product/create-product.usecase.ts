import type { ProductRepository } from "../../../domain/repositories/product.repository";
import { CreateProductDto } from "../../dtos/product/create-product.dto";
import { ProductEntity } from "../../../domain/entities/product.entity";
import { ConflictException } from "@nestjs/common";
import { Inject } from "@nestjs/common";

export class CreateProductUsecase {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository
    ) {
        this.productRepository = productRepository;
    }

    async execute(dto: CreateProductDto): Promise<ProductEntity> {
        const product = new ProductEntity(dto.id, dto.name, dto.price, dto.description, dto.stock, new Date(), new Date(), null);
        const existingProduct = await this.productRepository.findById(dto.id);
        if (existingProduct) {
            throw new ConflictException('Product already exists');
        }
        return await this.productRepository.create(product);
    }
}
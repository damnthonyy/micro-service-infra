import { ProductEntity } from "../../../domain/entities/product.entity";
import type { ProductRepository } from "../../../domain/repositories/product.repository";
import { NotFoundException } from "@nestjs/common";

import { Inject } from "@nestjs/common";

export class DeleteProductUsecase {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository
    ) {
        this.productRepository = productRepository;
    }

    async execute(id: string): Promise<ProductEntity> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return await this.productRepository.delete(id);
    }
}
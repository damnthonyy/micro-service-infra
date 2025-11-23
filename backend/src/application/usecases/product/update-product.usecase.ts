import { ProductEntity } from "../../../domain/entities/product.entity";
import type { ProductRepository } from "../../../domain/repositories/product.repository";
import { NotFoundException } from "@nestjs/common";
import { UpdateProductDto } from "../../dtos/product/update-product.dto";

import { Inject } from "@nestjs/common";

export class UpdateProductUsecase {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository
    ) {
        this.productRepository = productRepository;
    }

    async execute(product: Partial<ProductEntity> & { id: string }): Promise<ProductEntity> {
        const existingProduct = await this.productRepository.findById(product.id);
        if (!existingProduct) {
            throw new NotFoundException('Product not found');
        }
        const updatedProduct = Object.assign(existingProduct, product);
        return await this.productRepository.update(updatedProduct);
    }
}
import { ProductEntity } from "../../../domain/entities/product.entity";
import { ProductRepository } from "../../../domain/repositories/product.repository";
import { NotFoundException } from "@nestjs/common";

export class ValidateProductUsecase {
    constructor(private readonly productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(product: ProductEntity): Promise<ProductEntity> {
        const existingProduct = await this.productRepository.findById(product.id);
        if (!existingProduct) {
            throw new NotFoundException('Product not found');
        }
        return existingProduct;
    }
}
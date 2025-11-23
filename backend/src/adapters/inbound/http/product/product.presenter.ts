import { ProductEntity } from "src/domain/entities/product.entity";

export class ProductPresenter {
    static toResponse(product: ProductEntity) {
        // convert the product entity to a response object
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            deletedAt: product.deletedAt
        };
    }
}
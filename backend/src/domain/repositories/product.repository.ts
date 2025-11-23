import { ProductEntity } from "../entities/product.entity";

export interface ProductRepository {
    findById(id: string): Promise<ProductEntity | null>;
    findByName(name: string): Promise<ProductEntity | null>;
    findAll(): Promise<ProductEntity[]>;
    create(product: ProductEntity): Promise<ProductEntity>;
    update(product: ProductEntity): Promise<ProductEntity>;
    save(product: ProductEntity): Promise<ProductEntity>;
    delete(id: string): Promise<ProductEntity>;
}
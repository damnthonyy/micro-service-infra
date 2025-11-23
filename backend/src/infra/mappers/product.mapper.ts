import { ProductTypeormEntity as ProductEntityPg } from "../typeorm/product.typeorm.entity";
import { ProductEntity as ProductDomainEntity } from "../../domain/entities/product.entity";

export class ProductMapper {
    static toDomain(entity: ProductEntityPg): ProductDomainEntity {
        return new ProductDomainEntity(
            entity.id,
            entity.name,
            entity.price,
            entity.description,
            entity.stock,
            entity.createdAt,
            entity.updatedAt,
            entity.deletedAt
        );
    }

    static toPersistence(domain: ProductDomainEntity): ProductEntityPg {
        const entity = new ProductEntityPg();
        entity.id = domain.id!;
        entity.name = domain.name;
        entity.price = domain.price;
        entity.description = domain.description;
        entity.stock = domain.stock;
        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt;
        entity.deletedAt = domain.deletedAt;
        return entity;
    }
}

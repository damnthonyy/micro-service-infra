import { UserEntity as UserEntityPg } from "../typeorm/user.typeorm.entity";
import { UserEntity as UserDomainEntity } from "../../domain/entities/user.entity";

export class UserMapper {
    // Convert UserEntityPg to UserDomainEntity
    static toDomain(entity: UserEntityPg): UserDomainEntity {
        return new UserDomainEntity(
            entity.id,
            entity.name,
            entity.email,
            entity.password,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toPersistence(domain: UserDomainEntity): UserEntityPg {
        // Convert UserDomainEntity to UserEntityPg
        const entity = new UserEntityPg();
        if (domain.id) {
            entity.id = domain.id;
        }
        entity.name = domain.name;
        entity.email = domain.email;
        entity.password = domain.password;
        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt;
        return entity;
    }
}

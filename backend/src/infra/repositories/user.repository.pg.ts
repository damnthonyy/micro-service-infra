import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity as UserEntityPg } from "../typeorm/user.typeorm.entity";
import { UserEntity as UserDomainEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class UserRepositoryPg implements UserRepository {
    constructor(
        @InjectRepository(UserEntityPg)
        private readonly userRepository: Repository<UserEntityPg>
    ) { }

    async findByEmail(email: string): Promise<UserDomainEntity | null> {
        const user = await this.userRepository.findOneBy({ email })
        if (!user) return null
        return UserMapper.toDomain(user)
    }

    async findById(id: string): Promise<UserDomainEntity | null> {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) return null
        return UserMapper.toDomain(user)
    }

    async create(user: UserDomainEntity): Promise<UserDomainEntity> {
        const entity = UserMapper.toPersistence(user)
        const savedUser = await this.userRepository.save(entity)
        return UserMapper.toDomain(savedUser)
    }

    async update(user: UserDomainEntity): Promise<UserDomainEntity> {
        const entity = UserMapper.toPersistence(user)
        const savedUser = await this.userRepository.save(entity)
        return UserMapper.toDomain(savedUser)
    }

    async delete(id: string): Promise<UserDomainEntity> {
        const user = await this.findById(id)
        if (!user) throw new Error("User not found") // Or handle as you prefer
        await this.userRepository.delete(id)
        return user
    }
}

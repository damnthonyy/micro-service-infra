import { UserEntity } from '../entities/user.entity';
// Repository interface for the User entity
export interface UserRepository {
    findById(id: number): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    create(user: UserEntity): Promise<UserEntity>;
    update(user: UserEntity): Promise<UserEntity>;
    delete(id: number): Promise<UserEntity>;
    validateUser(user: UserEntity): Promise<void>;
}
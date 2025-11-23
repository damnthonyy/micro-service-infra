import { UserEntity } from "src/domain/entities/user.entity";

export class UserPresenter {
    // Return user data in response format for the user entity UserEntity
    static toResponse(user: UserEntity) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}
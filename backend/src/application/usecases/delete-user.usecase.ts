import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { DeleteUserDto } from '../dtos/delete-user.dto';

export class DeleteUserUsecase {
    // Constructor injection of the user repository
    constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    // Execute the usecase to delete a user
    async execute(dto: DeleteUserDto): Promise<UserEntity> {
        // Find the user by id
        const user = await this.userRepository.findById(dto.id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        // Validate the user
        await this.userRepository.validateUser(user);
        // Delete the user
        await this.userRepository.delete(dto.id);
        // Return the user
        return user;
    }
}
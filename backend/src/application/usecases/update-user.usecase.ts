import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UpdateUserUsecase {
    // Constructor injection of the user repository
    constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(dto: UpdateUserDto): Promise<UserEntity> {
        // Find the user by id
        const user = await this.userRepository.findById(dto.id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        // Update the user
        user.name = dto.name;
        user.password = dto.password;
        // Validate the user
        await this.userRepository.validateUser(user);
        // Update the user in the database
        await this.userRepository.update(user); 
        return user;
    }
}
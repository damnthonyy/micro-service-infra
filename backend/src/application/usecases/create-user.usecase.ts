import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserUsecase {
    // Constructor injection of the user repository
    constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    // Execute the usecase to create a new user
    async execute(dto: CreateUserDto): Promise<UserEntity>{
        const user = new UserEntity(null, dto.name, dto.email, dto.password, new Date(), new Date());
        // Validate the user
        await this.userRepository.validateUser(user);
        // Create the user
        return await this.userRepository.create(user);
    }

   
}

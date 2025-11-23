import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import * as bcrypt from 'bcrypt';
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
        // update user
        user.name = dto.name;
        const saltRounds = 10;
        user.password = await bcrypt.hash(dto.password, saltRounds);
        return await this.userRepository.update(user);
    }
}
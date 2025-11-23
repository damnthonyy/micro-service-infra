import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import * as bcrypt from 'bcrypt';
export class CreateUserUsecase {
    // Constructor injection of the user repository
    constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    // Execute the usecase to create a new user
    async execute(dto: CreateUserDto): Promise<UserEntity> {

        const existingUser = await this.userRepository.findByEmail(dto.email);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(dto.password, saltRounds);
        const user = new UserEntity(null, dto.name, dto.email, hashedPassword, new Date(), new Date());
        return await this.userRepository.create(user);
    }


}

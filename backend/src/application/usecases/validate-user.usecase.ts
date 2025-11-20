import { UserRepository } from '../../domain/repositories/user.repository';
import { ValidateUserDto } from '../dtos/validate-user.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';

export class ValidateUserUsecase {
    constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(dto: ValidateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        if (!(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return user;
    }
}
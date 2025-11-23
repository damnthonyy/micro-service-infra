import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
    password: string;
}
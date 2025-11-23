import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
    password: string;
}
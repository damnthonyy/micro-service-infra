import { IsUUID, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateProductDto {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: 10 })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: 10 })
    @IsNumber()
    @IsNotEmpty()
    stock: number;
}
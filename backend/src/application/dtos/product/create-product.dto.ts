import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: 'Product Name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 10 })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: 'Product Description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 10 })
    @IsNumber()
    @IsNotEmpty()
    stock: number;
}
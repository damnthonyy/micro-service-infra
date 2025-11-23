import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

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
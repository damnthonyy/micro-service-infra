import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseProductDto {
    @IsNotEmpty()
    @ApiProperty()
    id: string;
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    stock: number;

    @IsNotEmpty()
    @ApiProperty()
    createdAt: Date;

    @IsNotEmpty()
    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ nullable: true })
    deletedAt: Date | null;
}
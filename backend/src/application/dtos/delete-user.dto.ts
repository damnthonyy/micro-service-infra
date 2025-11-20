import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
    
}
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
    @ApiProperty({ example: 400 })
    statusCode: number;

    @ApiProperty({ example: 'Bad Request' })
    message: string;

    @ApiProperty({ example: 'Validation failed' })
    error: string;
}

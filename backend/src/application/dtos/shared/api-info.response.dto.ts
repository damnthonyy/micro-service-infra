import { ApiProperty } from '@nestjs/swagger';

export class ApiInfoResponseDto {
    @ApiProperty({ example: 'Welcome to Backend Microservice Infra Boilerplate API' })
    message: string;

    @ApiProperty({ example: '1.0.0' })
    version: string;

    @ApiProperty({ example: '/docs' })
    documentation: string;

    @ApiProperty({
        example: {
            users: '/users',
            products: '/products',
            swagger: '/docs'
        }
    })
    endpoints: Record<string, string>;
}

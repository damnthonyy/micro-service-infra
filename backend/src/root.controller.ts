import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiInfoResponseDto } from './application/dtos/shared/api-info.response.dto';

@ApiTags('Health')
@ApiBearerAuth()
@Controller('health')
export class RootController {
  @Get()
  @ApiOperation({
    summary: 'API Information',
    description: 'Returns API information and available endpoints'
  })
  @ApiResponse({ status: 200, description: 'API information retrieved successfully', type: ApiInfoResponseDto })
  getRoot() {
    return {
      message: 'Welcome to Backend Microservice Infra Boilerplate API',
      version: '1.0.0',
      documentation: '/docs',
      endpoints: {
        users: '/users',
        products: '/products',
        swagger: '/docs'
      }
    };
  }
}

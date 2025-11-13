import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class RootController {
  @Get()
  @ApiOperation({ 
    summary: 'API Information',
    description: 'Returns API information and available endpoints'
  })
  @ApiResponse({ status: 200, description: 'API information retrieved successfully' })
  getRoot() {
    return {
      message: 'Welcome to Backend Microservice Infra Boilerplate API',
      version: '1.0.0',
      documentation: '/docs',
      endpoints: {
        users: '/users',
        swagger: '/docs'
      }
    };
  }
}


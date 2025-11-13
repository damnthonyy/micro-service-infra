import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users successfully retrieved' })
  getUsers() {
    return [{ id: 1, name: 'Malick' }];
  }
}


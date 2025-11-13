import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class AppController {

  // GET /users
  @Get()
  @ApiOperation({ 
    summary: 'Get all users',
    description: 'Retrieves a list of all users in the system'
  })
  @ApiResponse({ status: 200, description: 'List of users successfully retrieved' })
  getUsers() {
    return [
      { id: 1, name: 'Antoine' },
      { id: 2, name: 'Malick' }
    ];
  }


  // GET /users/{id}
  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a user by id',
    description: 'Retrieves a specific user by their unique identifier'
  })
  @ApiParam({ name: 'id', description: 'User id', type: Number })
  @ApiResponse({ status: 200, description: 'User found' })
  getUser(@Param('id') id: number) {
    return { id, name: `User ${id}` };
  }
}


import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class AppController {
  @Get()
  getUsers() {
    return [{ id: 1, name: 'John Doe' }];
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }
}

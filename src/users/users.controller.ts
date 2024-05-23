import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get()
  findAllUser() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  async findOneUser(@Param('id') username: string): Promise<User> {
    return this.usersService.findOneUser(username);
  }

  @Patch(':id')
  updateUser(@Param('id') username: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(username, body);
  }

  @Delete(':id')
  removeUser(@Param('id') username: string) {
    return this.usersService.removeUser(username);
  }
}

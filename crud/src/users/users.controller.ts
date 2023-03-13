import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): User[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): User {
    const user = this.usersService.getUser(+id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`); //probably not the best solution
    }
    return user;
  }

  @Post()
  postUser(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.addUser(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.usersService.deleteUser(+id);
  }
}

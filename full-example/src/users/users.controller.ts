import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, SerializeOptions, UseInterceptors, ParseUUIDPipe, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

// apply transformation to response object
@UseInterceptors(ClassSerializerInterceptor)
// set type for plain objects
@SerializeOptions({ type: User })
@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly repository: UsersRepository) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.repository.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.repository.delete(id);
  }
}

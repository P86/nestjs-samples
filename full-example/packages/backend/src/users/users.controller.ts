import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, SerializeOptions, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor) // apply transformation to response object
@SerializeOptions({ type: UserEntity }) // set type for plain objects
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly repository: UsersRepository) { }

  @Post()
  @ApiOperation({ summary: 'Creates new user' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 201, description: 'Returns id of created user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  @ApiOperation({ summary: 'Returns all users' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 200, type: UserEntity, isArray: true })
  @Get()
  findAll() {
    return this.repository.findAll();
  }

  @ApiOperation({ summary: 'Returns specific user' })
  @ApiResponse({ status: 404, description: 'User with given id was not found' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Updates specific user' })
  @ApiResponse({ status: 404, description: 'User with given id was not found' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 201 })
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Deletes specific user' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.repository.delete(id);
  }
}

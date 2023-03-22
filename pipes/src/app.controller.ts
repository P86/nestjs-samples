import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AppService } from './app.service';
import { JanuszPipe } from './janusz/janusz.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return new User(id, 'test');
  }

  @Get('/by-name/:name')
  async findJanusz(@Param('name', JanuszPipe) name: string): Promise<User> {
    return new User(randomUUID(), name);
  }
}

export class User {
  constructor(public readonly id: string, public readonly name: string) {}
}

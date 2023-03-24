import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(RolesGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

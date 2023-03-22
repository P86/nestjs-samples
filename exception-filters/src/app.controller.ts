import {
  BadRequestException,
  Controller,
  Get,
  ImATeapotException,
  PayloadTooLargeException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //NestJS contains predefinded exceptions that are translated to equivalent http code
  @Get('teapot')
  getTeapot() {
    throw new ImATeapotException();
  }

  @Get('payload')
  payloadTooLarge() {
    throw new PayloadTooLargeException();
  }

  @Get('custom')
  customException() {
    throw new InvalidValueException();
  }
}

//also custom exception can be defined
export class InvalidValueException extends BadRequestException {
  constructor() {
    super('Given value is not correct');
  }
}

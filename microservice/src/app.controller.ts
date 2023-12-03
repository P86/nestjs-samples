import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // sends event
  @Get('/publish-notification')
  publishNotification(): string {
    return this.appService.publishNotification();
  }

  // initiates request-response communication
  @Get('/send-request')
  async sendRequest(): Promise<string> {
    return this.appService.sendRequest();
  }

  //handle event
  @EventPattern('notifications')
  handleNotification(@Payload() data: any): void {
    this.appService.handleNotification(data);
  }

  // handle request and returns response
  @MessagePattern('requests')
  handleRequest(@Payload() data: any): string {
    return this.appService.handleRequest(data);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('REDIS_SERVICE') private client: ClientProxy) {}

  publishNotification(): string {
    // emit returns hot observable - no need to subscribe
    this.client.emit('notifications', { msg: 'some notification' });
    return 'Notification sent!';
  }

  async sendRequest(): Promise<string> {
    return firstValueFrom(this.client.send('requests', 'do something'));
  }

  handleNotification(data: any): void {
    console.log('data', data);
  }

  handleRequest(data: any): string {
    return `Request received with value ${data}`;
  }
}

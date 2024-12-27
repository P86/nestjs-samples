import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {

  @Public()
  @Get('health')
  getHealth(): string {
    return 'OK'
  }
}

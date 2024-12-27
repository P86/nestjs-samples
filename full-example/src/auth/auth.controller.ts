import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({ path: 'auth', version: VERSION_NEUTRAL })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 201 })
  @Public()
  @Post()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

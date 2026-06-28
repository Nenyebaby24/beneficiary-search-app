import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(
    @Body()
    body: {
      phone: string;
      password: string;
    },
  ) {
    return this.authService.login(
      body.phone,
      body.password,
    );
  }
}
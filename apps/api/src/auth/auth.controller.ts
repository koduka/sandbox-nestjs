import { AuthService } from '@app/core/auth/auth.service';
import { Public } from '@app/core/auth/jwt-auth.guard';
import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return {
      access_token: await this.authService.login(
        loginDto.email,
        loginDto.password,
      ),
    };
  }
}

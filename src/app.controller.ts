import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './core/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  checkHealth(): string {
    return 'health ok';
  }
}

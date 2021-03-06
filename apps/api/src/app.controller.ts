import { Public } from '@app/core/auth/jwt-auth.guard';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  checkHealth(): string {
    return 'health ok';
  }
}

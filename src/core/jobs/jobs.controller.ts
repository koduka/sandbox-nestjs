import { Controller, Get, Post } from '@nestjs/common';
import { Public } from '../auth/jwt-auth.guard';
import { EXAMPLE_JOB, JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Public()
  @Post()
  send() {
    this.jobsService.dispach(EXAMPLE_JOB);
  }

  @Public()
  @Get()
  receive() {
    this.jobsService.resolve();
  }
}

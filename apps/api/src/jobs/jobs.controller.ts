import { Public } from '@app/core/auth/jwt-auth.guard';
import { EXAMPLE_JOB, JobsService } from '@app/core/jobs/jobs.service';
import { Controller, Get, Post } from '@nestjs/common';

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

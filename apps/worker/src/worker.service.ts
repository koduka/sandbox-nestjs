import { SqsService } from '@app/core/aws/sqs.service';
import { JobsService } from '@app/core/jobs/jobs.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerService {
  constructor(
    private readonly sqsService: SqsService,
    private readonly jobsService: JobsService,
  ) {}

  start(): void {
    this.sqsService.startPoll(this.jobsService.resolve);
    console.log('start worker');
  }

  stop(): void {
    this.sqsService.stopPoll();
    console.log('stop worker');
  }
}

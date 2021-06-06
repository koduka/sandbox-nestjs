import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsService } from '../aws/sqs.service';

export const EXAMPLE_JOB = 'exampleJob';

@Injectable()
export class JobsService {
  constructor(private readonly sqsService: SqsService) {}

  dispach(jobName: string, param: any = {}) {
    const body = {
      jobName: jobName,
      body: param,
    };
    this.sqsService.dispach(body);
  }

  async resolve() {
    this.sqsService.receive((messages: Message[]) => {
      messages.forEach((message) => {
        const body = JSON.parse(message.Body);
        this.apply(body.jobName, body.param);
      });
    });
  }

  async apply(jobName: string, param: any) {
    switch (jobName) {
      case EXAMPLE_JOB:
        this.exampleJob();
    }
  }

  async exampleJob() {
    console.log('exampleJob');
  }
}

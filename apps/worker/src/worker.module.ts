import { CoreModule } from '@app/core';
import { AwsModule } from '@app/core/aws/aws.module';
import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Module({
  imports: [CoreModule, AwsModule],
  providers: [WorkerService, AwsModule],
})
export class WorkerModule {}

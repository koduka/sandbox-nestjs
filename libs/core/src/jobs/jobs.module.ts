import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [AwsModule],
  providers: [JobsService],
})
export class JobsModule {}

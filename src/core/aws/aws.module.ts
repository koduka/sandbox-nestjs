import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import awsConfig from '../config/aws.config';
import cacheConfig from '../config/cache.config';
import { AwsService } from './aws.service';
import { SqsService } from './sqs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [awsConfig, cacheConfig],
    }),
  ],
  providers: [AwsService, SqsService],
  exports: [AwsService, SqsService],
})
export class AwsModule {}

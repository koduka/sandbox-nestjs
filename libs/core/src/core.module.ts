import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import cacheConfig from './config/cache.config';
import databaseConfig from './config/database.config';
import { CoreService } from './core.service';
import { JobsModule } from './jobs/jobs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, cacheConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('cache'),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    AwsModule,
    JobsModule,
  ],
  providers: [CoreService],
  exports: [CoreModule, UsersModule, AuthModule, AwsModule, JobsModule],
})
export class CoreModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersSubscriber } from './subscribers/users.subscriber';

@Module({
  providers: [UsersService, UsersSubscriber],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersSubscriber } from './subscribers/users.subscriber';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersSubscriber],
  exports: [UsersService],
})
export class UsersModule {}

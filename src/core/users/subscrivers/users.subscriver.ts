import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    connection: Connection,
    private readonly usersService: UsersService,
  ) {
    connection.subscribers.push(this);
  }

  async beforeInsert(event: InsertEvent<User>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
    const password: string = event.entity.password;
    if (password) {
      event.entity.password = await bcrypt.hash(password, 10);
    }
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    console.log(`BEFORE ENTITY UPDATED: `, event.entity);
    const password: string = event.entity.password;
    const user = await this.usersService.findById(event.entity.id);
    const isUpdatedPassword = await bcrypt.compare(password, user.password);
    if (isUpdatedPassword) {
      event.entity.password = await bcrypt.hash(password, 10);
    }
  }
}

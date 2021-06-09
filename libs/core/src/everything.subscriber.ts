import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class EverythingSubscriber implements EntitySubscriberInterface {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  beforeInsert(event: InsertEvent<any>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }

  beforeUpdate(event: UpdateEvent<any>) {
    console.log(`BEFORE ENTITY UPDATED: `, event.entity);
  }
}

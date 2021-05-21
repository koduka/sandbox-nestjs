import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

const ROLE_ADMIN = 'admin';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;
}

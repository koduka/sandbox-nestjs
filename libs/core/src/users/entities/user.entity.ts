import { BaseEntity } from '../../base.entity';
import { Exclude } from 'class-transformer';
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
  @Exclude()
  password: string;
}

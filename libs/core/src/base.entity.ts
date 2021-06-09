import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity as TypeOrmBaseEntity } from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @Column(`uuid`, {
    nullable: true,
  })
  createdBy: string | null;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Column(`uuid`, {
    nullable: true,
  })
  updatedBy: string | null;
}

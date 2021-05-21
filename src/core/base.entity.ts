import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
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

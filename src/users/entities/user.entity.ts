import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column('text')
  email: string;

  @Column({ length: 500 })
  password: string;
}

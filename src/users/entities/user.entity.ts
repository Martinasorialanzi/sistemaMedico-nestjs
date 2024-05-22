import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity } from 'typeorm';

export enum Role {
  User = 'user',
  Admin = 'admin',
}
@Entity()
export class User extends BaseEntity {
  @Column('text')
  username: string;

  @Column({ length: 500 })
  password: string;

  @Column()
  role: Role;
}

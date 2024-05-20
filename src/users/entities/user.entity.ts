import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column('bigint')
  email: ;

  @Column({ length: 500 })
  password: string;
}

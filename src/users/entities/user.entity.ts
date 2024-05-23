import { BaseEntity } from 'src/config/base.entity';
import { Role } from 'src/roles/role.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column('text')
  username: string;

  @Column({ length: 500 })
  password: string;

  @Column('simple-array')
  role: Role[];
}

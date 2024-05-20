import { BaseEntity } from 'src/config/base.entity';
import { Entry } from 'src/entries/entities/entry.entity';
// import { Entry } from 'src/entries/entities/entry.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Doctor extends BaseEntity {
  @Column('bigint')
  registrationNumber: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  surname: string;

  @Column('text')
  specialty: string;

  @Column('date')
  AdmissionDate: Date;

  @OneToMany(() => Entry, (entry) => entry.doctor)
  entries: Entry[];
}

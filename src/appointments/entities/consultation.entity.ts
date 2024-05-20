import { BaseEntity } from 'src/config/base.entity';
import { Disease } from 'src/diseases/entities/disease.entity';
import { Entry } from 'src/entries/entities/entry.entity';
// import { Entry } from 'src/entries/entities/entry.entity';
import { Entity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Consultation extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;

  @Column()
  patient: string;

  @Column()
  doctor: string;

  @Column('text')
  reason: string;

  @ManyToOne(() => Disease, (disease) => disease.consultations)
  @JoinColumn({ name: 'diagnosis' })
  diagnosis: Disease;

  @Column()
  diagnosisConfirmed: boolean;

  @OneToOne(() => Entry, (entry) => entry.consultations)
  entry: Entry;
}

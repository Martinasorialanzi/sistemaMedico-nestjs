import { Consultation } from 'src/appointments/entities/consultation.entity';
import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Disease extends BaseEntity {
  @Column()
  disease: string;

  @Column()
  description: string;
  @OneToMany(() => Consultation, (consultation) => consultation.diagnosis)
  consultations: Consultation[];
}

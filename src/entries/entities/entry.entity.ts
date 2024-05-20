// import { Consultation } from 'src/appointments/entities/consultation.entity';
import { Consultation } from 'src/appointments/entities/consultation.entity';
import { BaseEntity } from 'src/config/base.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
// import { Doctor } from 'src/doctors/entities/doctor.entity';
// import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
import { Practice } from 'src/practices/entities/practice.entity';
// import { Practice } from 'src/practices/entities/practice.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Entry extends BaseEntity {
  @ManyToOne(() => Doctor, (doctor) => doctor.entries)
  @JoinColumn()
  doctor: Doctor;

  @ManyToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.entries)
  medicalHistory: MedicalHistory;

  @OneToOne(() => Consultation, (consultation) => consultation.entry)
  @JoinColumn()
  consultations: Consultation;

  @OneToOne(() => Practice, (practice) => practice.entry)
  @JoinColumn()
  practices: Practice;
}

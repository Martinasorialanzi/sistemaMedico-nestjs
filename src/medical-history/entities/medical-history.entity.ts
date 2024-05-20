import { BaseEntity } from 'src/config/base.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class MedicalHistory extends BaseEntity {
  @Column({ name: 'patient_id' })
  patientId: number;

  @OneToOne(() => Patient, (patient) => patient.medicalHistory)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @OneToMany(() => Entry, (entry) => entry.medicalHistory)
  @JoinColumn()
  entries: Entry[];
}

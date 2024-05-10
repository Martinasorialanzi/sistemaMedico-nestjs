import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
// import { PatientsDoctorsEntity } from 'src/patients-doctor/entities/patiensDoctors.Entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  name: string;

  @Column('text')
  surname: string;

  @Column('text')
  specialty: string;

  @Column({ nullable: true })
  email: string;

  @Column('bigint')
  cellphone: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.doctor)
  medicalHistories: MedicalHistory[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  // @OneToMany(
  //   () => PatientsDoctorsEntity,
  //   (patientsDoctorsEntity) => patientsDoctorsEntity.patient,
  // )
  // patients: PatientsDoctorsEntity[];

  @ManyToMany(() => Patient, (patient) => patient.doctors)
  @JoinTable({
    name: 'patients_doctors',
    joinColumn: {
      name: 'doctor_id',
    },
    inverseJoinColumn: {
      name: 'patient_id',
    },
  })
  patiensPrueba: Patient[];
}

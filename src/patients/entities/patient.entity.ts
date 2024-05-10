import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
// import { PatientsDoctorsEntity } from 'src/patients-doctor/entities/patiensDoctors.Entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn() //los decoradores son para que se transfomrmen en columans de la tabla
  id: number; //y esto es para typescript
  @Column({ length: 500 })
  name: string;

  @Column('text')
  surname: string;

  @Column({ nullable: true })
  email: string;

  @Column('bigint')
  cellphone: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
  medicalHistories: MedicalHistory[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  // @OneToMany(
  //   () => PatientsDoctorsEntity,
  //   (patientsDoctorsEntity) => patientsDoctorsEntity.doctor,
  // )
  // doctors: PatientsDoctorsEntity[];

  @ManyToMany(() => Doctor, (doctor) => doctor.name)
  doctors: Doctor[];
}

// import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class MedicalHistory {
  @PrimaryGeneratedColumn() //los decoradores son para que se transfomrmen en columans de la tabla
  id: number; //y esto es para typescript

  @ManyToOne(() => Patient, (patient) => patient.medicalHistories)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalHistories)
  doctor: Doctor;

  @Column({ type: 'text' })
  symptoms: string;

  @Column({ type: 'text' })
  diagnosis: string;

  @Column({ type: 'text' })
  treatment: string;

  @Column({ nullable: true })
  additionalNotes: string; // Notas adicionales, opcional

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.medicalHistory)
  appointments: Appointment[];
}

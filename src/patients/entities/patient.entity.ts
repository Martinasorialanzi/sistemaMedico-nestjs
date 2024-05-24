import { BaseEntity } from 'src/config/base.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
import {
  Entity,
  Column,
  NumericType,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Patient extends BaseEntity {
  @Column('bigint')
  dni: NumericType;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  surname: string;

  @Column('date')
  birthDate: Date;

  @Column('text')
  healthInsurance: string;

  @OneToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.patient, {
    cascade: true,
  })
  medicalHistory: MedicalHistory;

  @DeleteDateColumn()
  deletedAt?: Date; // Esta columna almacenará la fecha de eliminación
}

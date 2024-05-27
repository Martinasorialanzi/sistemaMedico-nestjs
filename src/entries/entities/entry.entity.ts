import { BaseEntity } from 'src/config/base.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';
import { Entity, JoinColumn, ManyToOne, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Entry extends BaseEntity {
  @ManyToOne(() => Doctor, (doctor) => doctor.entries, { eager: true }) // eager loading para cargar Doctor automáticamente
  @JoinColumn({ name: 'doctorId', referencedColumnName: 'id' }) // Establecer la relación usando doctorId
  doctor: Doctor;

  @ManyToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.entries, {
    eager: true,
  }) // eager loading para cargar medicalHistory automáticamente
  @JoinColumn({ name: 'patientId', referencedColumnName: 'patientId' }) // Establecer la relación usando patientId
  medicalHistory: MedicalHistory;
}

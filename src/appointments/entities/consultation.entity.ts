// import { BaseEntity } from 'src/config/base.entity';
import { Disease } from 'src/diseases/entities/disease.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { Column, JoinColumn, ManyToOne, ChildEntity } from 'typeorm';

@ChildEntity()
export class Consultation extends Entry {
  @Column({ type: 'date' })
  date: Date;

  @Column('text')
  reason: string;

  @ManyToOne(() => Disease, (disease) => disease.consultations)
  @JoinColumn({ name: 'diagnosis' })
  diagnosis: Disease;

  @Column()
  diagnosisConfirmed: boolean;

  @Column({ nullable: true }) // Nullable porque el valor será establecido manualmente
  patientId: number; // Este campo almacenará el ID del paciente

  @Column({ nullable: true })
  doctorId: number;
}

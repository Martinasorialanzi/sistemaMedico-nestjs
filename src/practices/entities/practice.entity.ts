import { Entry } from 'src/entries/entities/entry.entity';
import { ChildEntity, Column } from 'typeorm';
@ChildEntity()
export class Practice extends Entry {
  @Column({ type: 'date' })
  date: Date;
  @Column()
  duration: number;
  @Column('text')
  complications: string;
  @Column('text')
  result: string;
  @Column({ nullable: true }) // Nullable porque el valor será establecido manualmente
  patientId: number; // Este campo almacenará el ID del paciente
  @Column({ nullable: true })
  doctorId: number;
}

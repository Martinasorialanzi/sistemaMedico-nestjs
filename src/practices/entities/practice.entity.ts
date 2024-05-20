import { BaseEntity } from 'src/config/base.entity';
import { Entry } from 'src/entries/entities/entry.entity';
// import { Entry } from 'src/entries/entities/entry.entity';
import { Column, Entity, OneToOne } from 'typeorm';
// duracion del porcedimiento en minutos, complicaciones (string) y resultado final.
@Entity()
export class Practice extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;
  @Column()
  patient: string;
  @Column()
  doctor: string;
  @Column()
  duration: number;
  @Column('text')
  complications: string;
  @Column('text')
  result: string;
  @OneToOne(() => Entry, (entry) => entry.practices)
  entry: Entry;
}

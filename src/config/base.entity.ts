import {
  CreateDateColumn,
  // DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp', //creo que este no hace falta cuando uso ese decorador
    default: () => 'CURRENT_TIMESTAMP(6)', //creo que este no hace falta cuando uso ese decorador
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp', //creo que este no hace falta cuando uso ese decorador
    default: () => 'CURRENT_TIMESTAMP(6)', //creo que este no hace falta cuando uso ese decorador
    onUpdate: 'CURRENT_TIMESTAMP(6)', //creo que este no hace falta cuando uso ese decorador
  })
  updatedAt: Date;

  //@DeleteDateColumn //se usa para un soft delete en este cas no iria en la base entity porque yo no quiero que tod tenga soft delete
}

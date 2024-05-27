import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { EntityManager, Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class EntriesService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  // public async findAllEntries(): Promise<Entry[]> {
  //   try {
  //     const entries: Entry[] = await this.entityManager
  //       .createQueryBuilder(Entry, 'entry')
  //       .leftJoinAndSelect('entry.doctor', 'doctor')
  //       .leftJoinAndSelect('entry.medicalHistory', 'medicalHistory')
  //       .leftJoinAndSelect('medicalHistory.patient', 'patient')
  //       // .select(['entry', 'doctor', 'patient'])
  //       .getMany();
  //     //aca guardo el error como tal
  //     if (entries.length === 0) {
  //       throw new ErrorManager({
  //         type: 'BAD_REQUEST',
  //         message: 'No se encontro resultado',
  //       });
  //     }
  //     return entries.map((entry) => ({
  //       ...entry,
  //       doctor: entry.doctor || null,
  //       patient: entry.medicalHistory ? entry.medicalHistory.patient : null,
  //     }));

  //     // return entries;
  //   } catch (error) {
  //     //aca lo ejecuto
  //     throw ErrorManager.createsignatureError(error.message);
  //   }
  // }

  public async findAllEntries(entryType?: string): Promise<Entry[]> {
    try {
      const queryBuilder = await this.entityManager
        .createQueryBuilder()
        .from(Entry, 'entry')
        .leftJoinAndSelect('entry.doctor', 'doctor')
        .leftJoinAndSelect('entry.medicalHistory', 'medicalHistory')
        .leftJoinAndSelect('medicalHistory.patient', 'patient')
        .select(['entry', 'doctor', 'medicalHistory', 'patient']);
      // .getMany();

      // Add the filter condition based on the entry type
      if (entryType) {
        queryBuilder.where('LOWER(entry.type) ILIKE :type', {
          type: `%${entryType.toLowerCase()}%`,
        });
      }

      const entries: Entry[] = await queryBuilder.getMany();

      if (entries.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }

      // Transformar los datos para eliminar el objeto 'medicalHistory'
      return entries.map((entry) => ({
        ...entry,
        doctor: entry.doctor || null,
        patient: entry.medicalHistory ? entry.medicalHistory.patient : null,
      }));
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} entry`;
  }
}

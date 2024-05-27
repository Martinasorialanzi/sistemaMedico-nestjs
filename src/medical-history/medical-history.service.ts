import { Injectable } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { MedicalHistory } from './entities/medical-history.entity';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
// import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
// import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';

@Injectable()
export class MedicalHistoryService {
  //inyecto mi repositorio:
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepository: Repository<MedicalHistory>,
  ) {}

  public async createMedicalHistory(
    body: CreateMedicalHistoryDto,
  ): Promise<MedicalHistory> {
    try {
      const medicalHistory = await this.medicalHistoryRepository.save(body);
      if (!medicalHistory) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return medicalHistory;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findAllMedicalHistory(): Promise<MedicalHistory[]> {
    try {
      const medicalHistories: MedicalHistory[] = await this.entityManager
        .createQueryBuilder(MedicalHistory, 'medicalHistory')
        .leftJoinAndSelect('medicalHistory.entries', 'entry')
        .getMany();
      //aca guardo el error como tal
      if (medicalHistories.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return medicalHistories;
    } catch (error) {
      //aca lo ejecuto
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findOneMedicalHistory(id: number): Promise<MedicalHistory> {
    try {
      const medicalHistory = await this.entityManager
        .createQueryBuilder(MedicalHistory, 'medicalHistory')
        .leftJoinAndSelect('medicalHistory.entries', 'entry')
        // .leftJoinAndSelect('entry.doctor', 'doctor')
        .where('medicalHistory.id = :id', { id })
        .getOne();
      if (!medicalHistory) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return medicalHistory;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  // public async updateMedicalHistory(
  //   id: number,
  //   body: UpdateMedicalHistoryDto,
  // ): Promise<UpdateResult> {
  //   try {
  //     const medicalHistory: UpdateResult =
  //       await this.medicalHistoryRepository.update(id, body);
  //     if (medicalHistory.affected === 0) {
  //       throw new ErrorManager({
  //         type: 'BAD_REQUEST',
  //         message: 'No se pudo actualizar',
  //       });
  //     }
  //     return medicalHistory;
  //   } catch (error) {
  //     throw ErrorManager.createsignatureError(error.message);
  //   }
  // }

  // public async removeMedicalHistory(id: number): Promise<DeleteResult> {
  //   try {
  //     const medicalHistory: DeleteResult =
  //       await this.medicalHistoryRepository.delete(id);
  //     if (medicalHistory.affected === 0) {
  //       throw new ErrorManager({
  //         type: 'BAD_REQUEST',
  //         message: 'No se pudo borrar',
  //       });
  //     }
  //     return medicalHistory;
  //   } catch (error) {
  //     throw ErrorManager.createsignatureError(error.message);
  //   }
  // }
}

import { Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>,
  ) {}
  public async createConsultation(
    body: CreateConsultationDto,
  ): Promise<Consultation> {
    try {
      const consultation: Consultation =
        await this.consultationRepository.save(body);
      if (!consultation) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return consultation;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findAllConsultations(): Promise<Consultation[]> {
    try {
      const consultation: Consultation[] =
        await this.consultationRepository.find();
      //aca guardo el error como tal
      if (consultation.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return consultation;
    } catch (error) {
      //aca lo ejecuto
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findOneConsultation(id: number): Promise<Consultation> {
    try {
      const consultation: Consultation = await this.consultationRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
      if (!consultation) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return consultation;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async updateConsultation(
    id: number,
    body: UpdateConsultationDto,
  ): Promise<UpdateResult> {
    try {
      const consultation: UpdateResult =
        await this.consultationRepository.update(id, body);
      if (consultation.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return consultation;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async removeConsultation(id: number): Promise<DeleteResult> {
    try {
      const consultation: DeleteResult =
        await this.consultationRepository.delete(id);
      if (consultation.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return consultation;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }
}

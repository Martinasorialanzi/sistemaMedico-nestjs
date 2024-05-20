import { Injectable } from '@nestjs/common';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { Disease } from './entities/disease.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class DiseasesService {
  constructor(
    @InjectRepository(Disease)
    private readonly diseaseRepository: Repository<Disease>,
  ) {}

  public async createDisease(body: CreateDiseaseDto): Promise<Disease> {
    try {
      const disease: Disease = await this.diseaseRepository.save(body);
      if (!disease) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return disease;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findAllDiseases(): Promise<Disease[]> {
    try {
      const diseases: Disease[] = await this.diseaseRepository.find();
      //aca guardo el error como tal
      if (diseases.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return diseases;
    } catch (error) {
      //aca lo ejecuto
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findOneDisease(id: number): Promise<Disease> {
    try {
      const disease: Disease = await this.diseaseRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
      if (!disease) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return disease;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async updateDisease(
    id: number,
    body: UpdateDiseaseDto,
  ): Promise<UpdateResult> {
    try {
      const disease: UpdateResult = await this.diseaseRepository.update(
        id,
        body,
      );
      if (disease.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return disease;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async removeDisease(id: number): Promise<DeleteResult> {
    try {
      const disease: DeleteResult = await this.diseaseRepository.delete(id);
      if (disease.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return disease;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }
}

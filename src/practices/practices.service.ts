import { Injectable } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { Practice } from './entities/practice.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PracticesService {
  constructor(
    @InjectRepository(Practice)
    private readonly practiceRepository: Repository<Practice>,
  ) {}

  public async createPractice(body: CreatePracticeDto): Promise<Practice> {
    try {
      const practice: Practice = await this.practiceRepository.save(body);
      if (!practice) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return practice;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findAllPractices(): Promise<Practice[]> {
    try {
      const practice: Practice[] = await this.practiceRepository.find();
      //aca guardo el error como tal
      if (practice.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return practice;
    } catch (error) {
      //aca lo ejecuto
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findOnePractice(id: number): Promise<Practice> {
    try {
      const practice: Practice = await this.practiceRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
      if (!practice) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return practice;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async updatePractice(
    id: number,
    body: UpdatePracticeDto,
  ): Promise<UpdateResult> {
    try {
      const practice: UpdateResult = await this.practiceRepository.update(
        id,
        body,
      );
      if (practice.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return practice;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async removePractice(id: number): Promise<DeleteResult> {
    try {
      const practice: DeleteResult = await this.practiceRepository.delete(id);
      if (practice.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return practice;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }
}

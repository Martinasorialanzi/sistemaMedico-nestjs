import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { Entry } from 'src/entries/entities/entry.entity';

@Injectable()
export class DoctorsService {
  //inyecto mi repositorio:
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  public async createDoctor(body: CreateDoctorDto): Promise<Doctor> {
    try {
      const doctor: Doctor = await this.doctorRepository.save(body);
      if (!doctor) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return doctor;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findAllDoctors(): Promise<Doctor[]> {
    try {
      const doctor: Doctor[] = await this.doctorRepository.find();
      //aca guardo el error como tal
      if (doctor.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return doctor;
    } catch (error) {
      //aca lo ejecuto
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findOneDoctor(id: number): Promise<Doctor> {
    try {
      const doctor: Doctor = await this.doctorRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
      if (!doctor) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return doctor;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async updateDoctor(
    id: number,
    body: UpdateDoctorDto,
  ): Promise<UpdateResult> {
    try {
      const doctor: UpdateResult = await this.doctorRepository.update(id, body);
      if (doctor.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return doctor;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async removeDoctor(id: number): Promise<DeleteResult> {
    try {
      // Set doctorId to null in related entries
      await this.entryRepository
        .createQueryBuilder()
        .update(Entry)
        .set({ doctor: null })
        .where('doctorId= :id', { id })
        .execute();
      const doctor: DeleteResult = await this.doctorRepository.delete(id);
      if (doctor.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return doctor;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }
}

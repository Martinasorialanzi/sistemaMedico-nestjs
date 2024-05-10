import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class PatientsService {
  //inyecto mi repositorio:
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  public async createPatient(body: CreatePatientDto): Promise<Patient> {
    try {
      const patient: Patient = await this.patientRepository.save(body);
      if (!patient) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return patient;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findAllPatients(): Promise<Patient[]> {
    try {
      const patients: Patient[] = await this.patientRepository.find();
      //aca guardo el error como tal
      if (patients.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return patients;
    } catch (error) {
      //aca lo ejecuto
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findOnePatient(id: number): Promise<Patient> {
    try {
      const patient: Patient = await this.patientRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
      if (!patient) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return patient;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async updatePatient(
    id: number,
    body: UpdatePatientDto,
  ): Promise<UpdateResult> {
    try {
      const patient: UpdateResult = await this.patientRepository.update(
        id,
        body,
      );
      if (patient.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return patient;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async removePatient(id: number): Promise<DeleteResult> {
    try {
      const patient: DeleteResult = await this.patientRepository.delete(id);
      if (patient.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return patient;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }
}

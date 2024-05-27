import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';

@Injectable()
export class PatientsService {
  //inyecto mi repositorio:
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepository: Repository<MedicalHistory>,
  ) {}

  public async createPatient(body: CreatePatientDto): Promise<Patient> {
    try {
      // Crear instancia del paciente y su historia clínica
      const patient: Patient = this.patientRepository.create({
        ...body,
        medicalHistory: {}, // Crear una historia clínica vacía
      });

      // Guardar el paciente, lo que también guardará la historia clínica gracias a `cascade`
      const savedPatient = await this.patientRepository.save(patient);
      if (!savedPatient) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return savedPatient;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findAllPatients(): Promise<Patient[]> {
    try {
      const patients: Patient[] = await this.patientRepository
        //   relations: ['medicalHistory'],
        // });
        //aca guardo el error como tal
        .createQueryBuilder('patient')
        .leftJoinAndSelect('patient.medicalHistory', 'medicalHistory')
        .select([
          'patient.id',
          'patient.dni',
          'patient.name',
          'patient.surname',
          'patient.birthDate',
          'patient.healthInsurance',
          'patient.createdAt',
          'patient.updatedAt',
          'patient.deletedAt',
          'medicalHistory.id',
        ])
        .getMany();
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
  async findAllWithDeleted(): Promise<Patient[]> {
    try {
      const patients: Patient[] = await this.patientRepository
        .createQueryBuilder('user')
        .withDeleted()
        .getMany();
      if (!patients) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return patients;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findOnePatient(id: number): Promise<Patient> {
    try {
      const patient: Patient = await this.patientRepository
        .createQueryBuilder('patient')
        .where({ id })
        .leftJoinAndSelect('patient.medicalHistory', 'medicalHistory')
        .select([
          'patient.id',
          'patient.dni',
          'patient.name',
          'patient.surname',
          'patient.birthDate',
          'patient.healthInsurance',
          'patient.createdAt',
          'patient.updatedAt',
          'patient.deletedAt',
          'medicalHistory.id',
        ])
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
      const patient: DeleteResult = await this.patientRepository.softDelete(id);
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

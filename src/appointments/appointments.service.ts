import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  public async createAppointment(
    body: CreateAppointmentDto,
  ): Promise<Appointment> {
    try {
      const appointment: Appointment =
        await this.appointmentRepository.save(body);
      if (!appointment) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return appointment;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findAllAppointments(): Promise<Appointment[]> {
    try {
      const appointments: Appointment[] =
        await this.appointmentRepository.find();
      //aca guardo el error como tal
      if (appointments.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return appointments;
    } catch (error) {
      //aca lo ejecuto
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findOneAppointment(id: number): Promise<Appointment> {
    try {
      const appointment: Appointment = await this.appointmentRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
      if (!appointment) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return appointment;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async updateAppointment(
    id: number,
    body: UpdateAppointmentDto,
  ): Promise<UpdateResult> {
    try {
      const appointment: UpdateResult = await this.appointmentRepository.update(
        id,
        body,
      );
      if (appointment.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return appointment;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async removeAppointment(id: number): Promise<DeleteResult> {
    try {
      const appointment: DeleteResult =
        await this.appointmentRepository.delete(id);
      if (appointment.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return appointment;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }
}

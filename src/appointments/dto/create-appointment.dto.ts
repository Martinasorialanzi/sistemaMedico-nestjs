import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity'; // Importamos el enum

export class CreateAppointmentDto {
  id: number; //y esto es para typescript

  @IsNotEmpty()
  @IsDate()
  date: Date;
  @IsNotEmpty()
  @IsDate()
  hour: Date;
  @IsNotEmpty()
  @IsNumber()
  patientId: number;
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  createdAt: Date;
}

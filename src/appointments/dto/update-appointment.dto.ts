import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsDate, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity'; // Importamos el enum

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsOptional()
  @IsDate()
  date: Date;
  @IsOptional()
  @IsDate()
  hour: Date;
  @IsOptional()
  @IsNumber()
  patientId: number;
  @IsOptional()
  @IsNumber()
  doctorId: number;
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationDto } from './create-consultation.dto';
import { IsDate, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
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
  @IsBoolean()
  confirmedDiagnosis: boolean;
}

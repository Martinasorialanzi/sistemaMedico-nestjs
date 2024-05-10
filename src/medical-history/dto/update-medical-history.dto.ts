import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalHistoryDto } from './create-medical-history.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicalHistoryDto extends PartialType(
  CreateMedicalHistoryDto,
) {
  @IsOptional()
  @IsString()
  symptoms: string;

  @IsOptional()
  @IsString()
  diagnosis: string;

  @IsOptional()
  @IsString()
  treatment: string;

  //   @IsArray()
  //   appointmentsDates: Date[]; // Array de fechas de citas médicas

  @IsOptional()
  additionalNotes: string; // Notas adicionales, opcional
}

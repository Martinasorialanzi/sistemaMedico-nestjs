import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalHistoryDto } from './create-medical-history.dto';
// import { IsNumber, IsOptional } from 'class-validator';

export class UpdateMedicalHistoryDto extends PartialType(
  CreateMedicalHistoryDto,
) {
  // @IsOptional()
  // @IsNumber()
  // patientId: number; // ID del paciente asociado
  // @IsOptional()
  // @IsString()
  // entry: string; // Entrada en el historial médico
}

import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Disease } from 'src/diseases/entities/disease.entity';

export class CreateConsultationDto {
  id: number; //y esto es para typescript

  @IsNotEmpty()
  @IsDate()
  date: Date;
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;
  @IsNotEmpty()
  @IsNumber()
  patientId: number;
  @IsNotEmpty()
  @IsString()
  reason: string;
  @IsNotEmpty()
  @IsString()
  diagnosis: Disease;
  @IsBoolean()
  confirmedDiagnosis: boolean;

  createdAt: Date;
}

import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Disease } from 'src/diseases/entities/disease.entity';

export class CreateConsultationDto {
  id: number; //y esto es para typescript

  @IsNotEmpty()
  @IsDate()
  date: Date;
  @IsNotEmpty()
  @IsString()
  patient: string;
  @IsNotEmpty()
  @IsString()
  doctor: string;
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

import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { NumericType } from 'typeorm';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsOptional()
  @IsNumber()
  dni: NumericType;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  surname: string;
  @IsOptional()
  @IsDate()
  birthDate: Date;
  @IsOptional()
  @IsString()
  healthInsurance: string;
  updatedAt: Date;
}

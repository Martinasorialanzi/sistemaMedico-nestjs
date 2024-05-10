import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  surname: string;
  @IsEmail()
  email: string;
  @IsOptional()
  @IsNumber()
  cellphone: number;
}

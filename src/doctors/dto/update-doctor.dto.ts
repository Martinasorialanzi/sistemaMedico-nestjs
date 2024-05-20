import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsDate } from 'class-validator';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  surname: string;
  @IsOptional()
  @IsString()
  specialty: string;
  @IsOptional()
  @IsDate()
  AdmissionDate: Date;
}

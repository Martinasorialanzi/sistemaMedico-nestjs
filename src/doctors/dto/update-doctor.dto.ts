import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsNumber, IsString } from 'class-validator';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
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

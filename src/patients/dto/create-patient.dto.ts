import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NumericType } from 'typeorm';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsNumber()
  dni: NumericType;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  surname: string;
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;
  @IsNotEmpty()
  @IsString()
  healthInsurance: string;
  createdAt: Date;
}

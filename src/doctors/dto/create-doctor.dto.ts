import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDoctorDto {
  id: number;
  @IsNotEmpty()
  @IsNumber()
  registrationNumber: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  surname: string;
  @IsNotEmpty()
  @IsString()
  specialty: string;
  @IsNotEmpty()
  @IsDate()
  AdmissionDate: Date;
  createdAt: Date;
}

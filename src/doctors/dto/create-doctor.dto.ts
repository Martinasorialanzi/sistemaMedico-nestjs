import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDoctorDto {
  id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  surname: string;
  @IsNotEmpty()
  @IsString()
  specialty: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsNumber()
  cellphone: number;
  createdAt: Date;
}

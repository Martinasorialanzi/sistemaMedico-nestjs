import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePracticeDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;
  @IsNotEmpty()
  @IsNumber()
  patientId: number;
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  @IsNotEmpty()
  @IsString()
  complications: string;
  @IsNotEmpty()
  @IsString()
  result: string;
}

import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePracticeDto {
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
  @IsNumber()
  duration: number;
  @IsNotEmpty()
  @IsString()
  complications: string;
  @IsNotEmpty()
  @IsString()
  result: string;

  createdAt: Date;
}

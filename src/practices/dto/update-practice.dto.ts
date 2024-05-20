import { PartialType } from '@nestjs/mapped-types';
import { CreatePracticeDto } from './create-practice.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePracticeDto extends PartialType(CreatePracticeDto) {
  @IsOptional()
  @IsDate()
  date: Date;
  @IsOptional()
  @IsString()
  patient: string;
  @IsOptional()
  @IsString()
  doctor: string;
  @IsOptional()
  @IsNumber()
  duration: number;
  @IsOptional()
  @IsString()
  complications: string;
  @IsOptional()
  @IsString()
  result: string;

  updatedAt: Date;
}

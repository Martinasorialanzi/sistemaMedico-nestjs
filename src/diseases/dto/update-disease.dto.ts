import { PartialType } from '@nestjs/mapped-types';
import { CreateDiseaseDto } from './create-disease.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDiseaseDto extends PartialType(CreateDiseaseDto) {
  @IsOptional()
  @IsString()
  disease: string;

  @IsOptional()
  @IsString()
  description: string;
}

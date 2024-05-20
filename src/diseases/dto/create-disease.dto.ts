import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDiseaseDto {
  @IsNotEmpty()
  @IsString()
  disease: string;

  @IsOptional()
  @IsString()
  description: string;
}

import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicalHistoryDto {
  id: number; //y esto es para typescript

  @IsNotEmpty()
  @IsString()
  symptoms: string;

  @IsNotEmpty()
  @IsString()
  diagnosis: string;

  @IsNotEmpty()
  @IsString()
  treatment: string;

  @IsArray()
  @IsDate({ each: true })
  appointmentsDates: Date[]; // Array de fechas de citas médicas

  @IsString()
  additionalNotes: string; // Notas adicionales, opcional

  createdAt: Date;
}

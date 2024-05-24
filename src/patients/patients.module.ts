import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, MedicalHistory])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}

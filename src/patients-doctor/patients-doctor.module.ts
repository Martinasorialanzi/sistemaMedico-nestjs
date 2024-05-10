import { Module } from '@nestjs/common';
import { PatientsDoctorService } from './patients-doctor.service';
import { PatientsDoctorController } from './patients-doctor.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { PatientsDoctorsEntity } from './entities/patiensDoctors.Entity';

@Module({
  // imports: [TypeOrmModule.forFeature([PatientsDoctorsEntity])],
  controllers: [PatientsDoctorController],
  providers: [PatientsDoctorService],
})
export class PatientsDoctorModule {}

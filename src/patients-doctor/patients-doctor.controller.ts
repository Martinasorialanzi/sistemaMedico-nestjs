import { Controller } from '@nestjs/common';
import { PatientsDoctorService } from './patients-doctor.service';

@Controller('patients-doctor')
export class PatientsDoctorController {
  constructor(private readonly patientsDoctorService: PatientsDoctorService) {}
}

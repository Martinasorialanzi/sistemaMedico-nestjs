import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
// import { Entry } from '../entities/entry.entity';

export class CreateEntryDto {
  //   entry: Entry;
  doctor: Doctor;
  patient: Patient;
}

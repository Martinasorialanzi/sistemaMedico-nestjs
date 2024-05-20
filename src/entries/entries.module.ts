import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Consultation } from 'src/appointments/entities/consultation.entity';
import { Practice } from 'src/practices/entities/practice.entity';
import { MedicalHistory } from 'src/medical-history/entities/medical-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry, Consultation, Practice, MedicalHistory]),
  ],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}

import { Module } from '@nestjs/common';
import { ConsultationsService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation])],
  controllers: [ConsultationController],
  providers: [ConsultationsService],
})
export class ConsultationsModule {}

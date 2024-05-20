import { Module } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practice } from './entities/practice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Practice])],
  controllers: [PracticesController],
  providers: [PracticesService],
})
export class PracticesModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  createDoctor(@Body() body: CreateDoctorDto) {
    return this.doctorsService.createDoctor(body);
  }

  @Get()
  findAllDoctors() {
    return this.doctorsService.findAllDoctors();
  }

  @Get(':id')
  findOneDoctor(@Param('id') id: string) {
    return this.doctorsService.findOneDoctor(+id);
  }

  @Patch(':id')
  updateDoctor(@Param('id') id: string, @Body() body: UpdateDoctorDto) {
    return this.doctorsService.updateDoctor(+id, body);
  }

  @Delete(':id')
  removeDoctor(@Param('id') id: string) {
    return this.doctorsService.removeDoctor(+id);
  }
}

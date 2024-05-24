import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  createDoctor(@Body() body: CreateDoctorDto) {
    return this.doctorsService.createDoctor(body);
  }

  @Get()
  findAllDoctors() {
    return this.doctorsService.findAllDoctors();
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOneDoctor(@Param('id') id: string) {
    return this.doctorsService.findOneDoctor(+id);
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updateDoctor(@Param('id') id: string, @Body() body: UpdateDoctorDto) {
    return this.doctorsService.updateDoctor(+id, body);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  removeDoctor(@Param('id') id: string) {
    return this.doctorsService.removeDoctor(+id);
  }
}

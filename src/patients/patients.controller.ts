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
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {} //inyecto la clase PatientService asi los conecto

  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('register')
  createPatient(@Body() body: CreatePatientDto) {
    return this.patientsService.createPatient(body);
  }

  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('all')
  findAllPatients() {
    return this.patientsService.findAllPatients();
  }

  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOnePatient(@Param('id') id: string) {
    return this.patientsService.findOnePatient(+id);
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updatePatient(@Param('id') id: string, @Body() body: UpdatePatientDto) {
    return this.patientsService.updatePatient(+id, body);
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  removePatient(@Param('id') id: string) {
    return this.patientsService.removePatient(+id);
  }
}

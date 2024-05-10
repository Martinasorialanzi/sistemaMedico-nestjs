import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get()
  findAllAppointments() {
    return this.appointmentsService.findAllAppointments();
  }

  @Get(':id')
  findOneAppointment(@Param('id') id: string) {
    return this.appointmentsService.findOneAppointment(+id);
  }

  @Patch(':id')
  updateAppointmentDto(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.updateAppointment(
      +id,
      updateAppointmentDto,
    );
  }

  @Delete(':id')
  removeAppointment(@Param('id') id: string) {
    return this.appointmentsService.removeAppointment(+id);
  }
}

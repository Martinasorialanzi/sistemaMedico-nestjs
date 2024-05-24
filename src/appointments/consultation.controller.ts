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
import { ConsultationsService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationsService: ConsultationsService) {}
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  createConsultation(@Body() body: CreateConsultationDto) {
    return this.consultationsService.createConsultation(body);
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAllConsultations() {
    return this.consultationsService.findAllConsultations();
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOneConsultation(@Param('id') id: string) {
    return this.consultationsService.findOneConsultation(+id);
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updateConsultationDto(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationsService.updateConsultation(
      +id,
      updateConsultationDto,
    );
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  removeConsultation(@Param('id') id: string) {
    return this.consultationsService.removeConsultation(+id);
  }
}

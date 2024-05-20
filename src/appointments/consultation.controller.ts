import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultationsService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  createConsultation(@Body() body: CreateConsultationDto) {
    return this.consultationsService.createConsultation(body);
  }

  @Get()
  findAllConsultations() {
    return this.consultationsService.findAllConsultations();
  }

  @Get(':id')
  findOneConsultation(@Param('id') id: string) {
    return this.consultationsService.findOneConsultation(+id);
  }

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

  @Delete(':id')
  removeConsultation(@Param('id') id: string) {
    return this.consultationsService.removeConsultation(+id);
  }
}

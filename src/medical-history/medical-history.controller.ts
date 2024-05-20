import {
  Body,
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  Post,
  // Delete,
} from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
// import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
// import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';

@Controller('medicalhistory')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  @Post('register')
  CreateMedicalHistoryDto(@Body() body: CreateMedicalHistoryDto) {
    return this.medicalHistoryService.createMedicalHistory(body);
  }

  @Get('all')
  findAllMedicalHistory() {
    return this.medicalHistoryService.findAllMedicalHistory();
  }

  @Get(':id')
  findOneMedicalHistory(@Param('id') id: string) {
    return this.medicalHistoryService.findOneMedicalHistory(+id);
  }

  // @Patch(':id')
  // updateMedicalHistory(
  //   @Param('id') id: string,
  //   @Body() body: UpdateMedicalHistoryDto,
  // ) {
  //   return this.medicalHistoryService.updateMedicalHistory(+id, body);
  // }

  // @Delete(':id')
  // removeMedicalHistory(@Param('id') id: string) {
  //   return this.medicalHistoryService.removeMedicalHistory(+id);
  // }
}

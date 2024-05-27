import {
  Body,
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  Post,
  UseGuards,
  // Delete,
} from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
// import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
// import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';

@Controller('medicalhistory')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('register')
  CreateMedicalHistoryDto(@Body() body: CreateMedicalHistoryDto) {
    return this.medicalHistoryService.createMedicalHistory(body);
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('all')
  findAllMedicalHistory() {
    return this.medicalHistoryService.findAllMedicalHistory();
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOneMedicalHistory(@Param('id') id: number) {
    return this.medicalHistoryService.findOneMedicalHistory(id);
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

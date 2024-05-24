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
import { DiseasesService } from './diseases.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('diseases')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  createDisease(@Body() body: CreateDiseaseDto) {
    return this.diseasesService.createDisease(body);
  }

  @Get()
  findAllDiseases() {
    return this.diseasesService.findAllDiseases();
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOneDisease(@Param('id') id: string) {
    return this.diseasesService.findOneDisease(+id);
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updateDisease(@Param('id') id: string, @Body() body: UpdateDiseaseDto) {
    return this.diseasesService.updateDisease(+id, body);
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  removeDisease(@Param('id') id: string) {
    return this.diseasesService.removeDisease(+id);
  }
}

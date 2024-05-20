import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';

@Controller('diseases')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Post()
  createDisease(@Body() body: CreateDiseaseDto) {
    return this.diseasesService.createDisease(body);
  }

  @Get()
  findAllDiseases() {
    return this.diseasesService.findAllDiseases();
  }

  @Get(':id')
  findOneDisease(@Param('id') id: string) {
    return this.diseasesService.findOneDisease(+id);
  }

  @Patch(':id')
  updateDisease(@Param('id') id: string, @Body() body: UpdateDiseaseDto) {
    return this.diseasesService.updateDisease(+id, body);
  }

  @Delete(':id')
  removeDisease(@Param('id') id: string) {
    return this.diseasesService.removeDisease(+id);
  }
}

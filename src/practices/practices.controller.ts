import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';

@Controller('practices')
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}

  @Post()
  createPractice(@Body() body: CreatePracticeDto) {
    return this.practicesService.createPractice(body);
  }

  @Get()
  findAllPractices() {
    return this.practicesService.findAllPractices();
  }

  @Get(':id')
  findOnePractice(@Param('id') id: string) {
    return this.practicesService.findOnePractice(+id);
  }

  @Patch(':id')
  updatePractice(@Param('id') id: string, @Body() body: UpdatePracticeDto) {
    return this.practicesService.updatePractice(+id, body);
  }

  @Delete(':id')
  removePractice(@Param('id') id: string) {
    return this.practicesService.removePractice(+id);
  }
}

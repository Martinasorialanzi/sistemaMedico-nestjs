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
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('practices')
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  createPractice(@Body() body: CreatePracticeDto) {
    return this.practicesService.createPractice(body);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAllPractices() {
    return this.practicesService.findAllPractices();
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOnePractice(@Param('id') id: string) {
    return this.practicesService.findOnePractice(+id);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updatePractice(@Param('id') id: string, @Body() body: UpdatePracticeDto) {
    return this.practicesService.updatePractice(+id, body);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  removePractice(@Param('id') id: string) {
    return this.practicesService.removePractice(+id);
  }
}

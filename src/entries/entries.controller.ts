import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}
  // @Roles(Role.Admin, Role.Secretary)
  // @UseGuards(AuthGuard, RolesGuard)
  // @Post()
  // create(@Body() createEntryDto: CreateEntryDto) {
  //   return this.entriesService.create(createEntryDto);
  // }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAllEntries() {
    return this.entriesService.findAllEntries();
  }
  @Roles(Role.Admin, Role.Secretary)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entriesService.findOne(+id);
  }
  // @Roles(Role.Admin, Role.Secretary)
  // @UseGuards(AuthGuard, RolesGuard)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
  //   return this.entriesService.update(+id, updateEntryDto);
  // }
  // @Roles(Role.Admin, Role.Secretary)
  // @UseGuards(AuthGuard, RolesGuard)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.entriesService.remove(+id);
  // }
}

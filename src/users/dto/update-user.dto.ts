import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Role, { each: true })
  role: Role[];
}

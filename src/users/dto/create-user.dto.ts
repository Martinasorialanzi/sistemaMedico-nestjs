import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

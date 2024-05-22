import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  //inyecto mi repositorio:
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(body: CreateUserDto): Promise<User> {
    try {
      const user: User = await this.userRepository.save(body);
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findAllUser(): Promise<User[]> {
    try {
      const user: User[] = await this.userRepository.find();
      //aca guardo el error como tal
      if (user.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return user;
    } catch (error) {
      //aca lo ejecuto
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async findOneUser(username: string): Promise<User | undefined> {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder('user')
        .where({ username })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async updateUser(
    username: string,
    body: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        username,
        body,
      );
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }

  public async removeUser(username: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(username);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createsignatureError(error.message);
    }
  }
}
export { User };

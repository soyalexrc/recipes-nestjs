import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { GenericResult } from '../common/interfaces';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async register(registerDto: RegisterDto): Promise<GenericResult<User | any>> {
    try {
      const userExist = await this.userRepository.findBy({
        email: registerDto.email,
      });

      if (userExist.length > 0) {
        return {
          data: {},
          error: true,
          message: `El usuario con el email: ${registerDto.email}, ya se encuentra registrado en nuestro sistema`,
        };
      }

      const user = this.userRepository.create(registerDto);
      const data = await this.userRepository.save(user);

      return {
        data,
        error: null,
        message: 'Se registro el usuario con exito, bienvenido!.',
      };
    } catch (error) {
      console.log(error);
    }
  }

  loginWithGoogle() {
    return `This action returns all auth`;
  }

  async login(loginDto: LoginDto): Promise<GenericResult<User | any>> {
    try {
      const userExists = await this.userRepository.findBy({
        email: loginDto.email,
      });

      if (!userExists) {
        return {
          data: {},
          error: true,
          message: `No se encontro un usuario con el email: ${loginDto.email}`,
        };
      }

      if (userExists[0].password !== loginDto.password) {
        return {
          data: {},
          error: true,
          message: `Las contrasenas no coinciden`,
        };
      }

      return {
        data: userExists[0],
        error: null,
        message: `Bienvenido, ${userExists[0].name}`,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

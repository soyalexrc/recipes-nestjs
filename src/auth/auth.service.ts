import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
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
  async register(
    createAuthDto: CreateAuthDto,
  ): Promise<GenericResult<User | any>> {
    try {
      const userExist = await this.userRepository.findBy({
        email: createAuthDto.email,
      });

      if (userExist.length > 0) {
        return {
          data: {},
          error: true,
          message: `El usuario con el email: ${createAuthDto.email}, ya se encuentra registrado en nuestro sistema`,
        };
      }

      const user = this.userRepository.create(createAuthDto);
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

  login() {
    return `This action returns all auth`;
  }

  loginWithGoogle() {
    return 'this actions evaluates the googleId, the email and if not registered register automatic';
  }
}

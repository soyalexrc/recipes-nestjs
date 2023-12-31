import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  googleId: string;
}

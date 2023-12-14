import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  googleId: string;
}

import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}

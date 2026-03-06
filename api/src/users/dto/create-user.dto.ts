import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Неверный формат email" })
  email: string;

  @IsString()
  @MinLength(6, { message: "Имя слишком короткое" })
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(6, { message: "Пароль минимум 6 символов" })
  @MaxLength(50)
  password: string;
}
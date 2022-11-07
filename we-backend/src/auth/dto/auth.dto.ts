import { IsEmail, IsEmpty, isEmpty, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  // @IsString()
  firstName?: string

  // @IsString()
  lastName?: string

  // @IsString()
  nickName?: string
}
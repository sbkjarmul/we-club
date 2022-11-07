import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator"

export class LoteryDto {
  @IsNumberString()
  userId: number

  @IsNumberString()
  drawnUserId?: number
}
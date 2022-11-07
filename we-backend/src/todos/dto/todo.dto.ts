import { IsNotEmpty, IsString } from "class-validator"

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  description: string

  assigned?: string

  id?: number
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) { }

  async getAll() {
    const users = await this.prismaService.todo.findMany({
      select: {
        id: true,
        description: true,
        assigned: true,
      }
    })

    return users
  }

  async addTodo(dto: TodoDto) {
    return await this.prismaService.todo.create({
      data: {
        description: dto.description,
        assigned: dto.assigned,
      },
      select: {
        id: true,
        description: true,
        assigned: true,
      }
    })
  }

  async assignTodo(todoId: number, nickName: string) {
    return await this.prismaService.todo.update({
      where: {
        id: Number(todoId)
      },
      data: {
        assigned: nickName
      }
    })
  }

  async deleteTodo(todoId: number) {
    try {
      return await this.prismaService.todo.delete({
        where: {
          id: todoId
        },
        select: {
          id: true
        }
      })
    } catch (e) {
      throw new NotFoundException('Record not found')
    }
  }
}

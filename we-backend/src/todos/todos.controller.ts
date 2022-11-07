import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { TodoDto } from './dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) { }

  @UseGuards(JwtGuard)
  @Get('all')
  getAll() {
    return this.todoService.getAll()
  }

  @UseGuards(JwtGuard)
  @Post('add')
  addTodo(@Body() dto: TodoDto) {
    return this.todoService.addTodo(dto)
  }

  @UseGuards(JwtGuard)
  @Put('assign')
  assignTodo(@Body('todoId') todoId: number, @GetUser() user: User) {
    return this.todoService.assignTodo(todoId, user.nickName)
  }

  @UseGuards(JwtGuard)
  @Put('unassign')
  unssignTodo(@Body('todoId') todoId: number) {
    return this.todoService.assignTodo(todoId, '')
  }

  @UseGuards(JwtGuard)
  @Delete('delete')
  deleteTodo(@Body('todoId') todoId: number) {
    return this.todoService.deleteTodo(todoId)
  }
}
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private prismaService: PrismaService) { }

  @Get('me')
  getMe(@GetUser() user: User) {
    return user
  }

  @Get()
  async getAll() {
    const users = await this.prismaService.user.findMany()
    return users
  }
}

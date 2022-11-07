import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { LoteryService } from './lotery.service';

@Controller('lotery')
export class LoteryController {
  constructor(private loteryService: LoteryService) { }

  @Get('create')
  create() {
    this.loteryService.createList()
    return 'lotery created'
  }

  @UseGuards(JwtGuard)
  @Get('draw')
  drawn(@GetUser() user: User) {
    return this.loteryService.drawn(user.id)
  }

  @UseGuards(JwtGuard)
  @Get('whom')
  getDrawnUser(@GetUser() user: User) {
    return this.loteryService.getDrawnUserId(user.id)
  }
}

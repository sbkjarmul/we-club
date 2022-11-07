import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoteryModule } from './lotery/lotery.module';
import { PrismaModule } from './prisma/prisma.module';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';

@Module({
  imports: [AuthModule, UserModule, LoteryModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { LoteryService } from './lotery.service';
import { LoteryController } from './lotery.controller';

@Module({
  providers: [LoteryService],
  controllers: [LoteryController]
})
export class LoteryModule {}

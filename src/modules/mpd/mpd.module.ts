import { Module } from '@nestjs/common';
import { MpdController } from './mpd.controller';
import { MpdService } from './mpd.service';

@Module({
  controllers: [MpdController],
  providers: [MpdService],
})
export class MpdModule {}

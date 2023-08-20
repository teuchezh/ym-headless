import { Body, Controller, Get, Post } from '@nestjs/common';
import { MpdService } from './mpd.service';

@Controller('mpd')
export class MpdController {
  constructor(private readonly mpdService: MpdService) {}

  @Get('status')
  async status() {
    // return this.mpdService.status();
  }

  @Post('add')
  async add(@Body() body: any) {
    console.log(body)
    return this.mpdService.add(body.url);
  }
}

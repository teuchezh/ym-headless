import { Controller, Get, Post, Headers } from '@nestjs/common';
import { YMApiService } from './ymapi.service';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';

@Controller('ym')
export class YMApiController {
  constructor(private readonly ymService: YMApiService) {}

  @ApiOperation({
    operationId: 'authByToken',
    summary: 'Auth by token',
  })
  @ApiHeader({
    name: 'x-token',
  })
  @Post('auth')
  async auth(@Headers() headers: Record<string, string>) {
    return this.ymService.signInToken(headers['x-token']);
  }

  @Get('liked')
  async likedTracks() {
    return this.ymService.getLikedTracks();
  }

  @Get()
  async getHello(): Promise<any> {
    const lickedTracks = await this.ymService.getLikedTracks();

    console.log(lickedTracks.result[0]);
    const trackUrl = this.ymService.getTrackUrl(
      lickedTracks.result[0].id.toString(),
    );

    return trackUrl;
  }
}

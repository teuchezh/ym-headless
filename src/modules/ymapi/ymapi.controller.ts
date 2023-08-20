import { Controller, Get, Post, Headers, Param } from '@nestjs/common';
import { YMApiService } from './ymapi.service';
import { ApiHeader, ApiOperation, ApiParam } from '@nestjs/swagger';

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

  @Get(':id')
  @ApiOperation({
    operationId: 'getTrackUrl',
    summary: 'Get Track Url By ID',
  })
  @ApiParam({
    name: 'id',
  })
  async getTrackUrl(@Param() params: any): Promise<any> {
    const trackUrl = this.ymService.getTrackUrl(params.id);

    return trackUrl;
  }
}

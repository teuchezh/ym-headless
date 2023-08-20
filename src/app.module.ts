import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';

import { YMApiModule } from './modules/ymapi/ymapi.module';
import { YMApiController } from './modules/ymapi/ymapi.controller';
import { YMApiService } from './modules/ymapi/ymapi.service';
import { join } from 'path';
import { MpdService } from './modules/mpd/mpd.service';
import { MpdModule } from './modules/mpd/mpd.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    YMApiModule,
    MpdModule,
  ],
  controllers: [AppController, YMApiController],
  providers: [AppService, YMApiService, MpdService],
})
export class AppModule {}

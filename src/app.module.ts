import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';

import { YMApiModule } from './modules/ymapi/ymapi.module';
import { YMApiController } from './modules/ymapi/ymapi.controller';
import { YMApiService } from './modules/ymapi/ymapi.service';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    YMApiModule,
  ],
  controllers: [AppController, YMApiController],
  providers: [AppService, YMApiService],
})
export class AppModule {}

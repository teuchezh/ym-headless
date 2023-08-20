import { Injectable, OnModuleInit } from '@nestjs/common';
import type { MPDApi } from 'mpd-api';
import mpdApi from 'mpd-api';

@Injectable()
export class MpdService implements OnModuleInit {
  private client: Promise<MPDApi.ClientAPI>;
  // (method) MPDApi.MPDApi.connect(config?: MPD.Config): Promise<MPDApi.ClientAPI>

  // todo: Подумать над реализацией
  async onModuleInit() {
    this.client = mpdApi.connect({
      host: '192.168.1.213',
      port: 6600,
      // password: '',
    });
  }

  constructor() {}

  // async status() {
  //   const connection = console.log(
  //     await this.client.sendCommand(
  //       'add https://.mp3',
  //     ),
  //   );

  //   return connection.api.status.get();
  // }

  async add(body) {
    console.log(body);
    (await this.client).sendCommand(`add ${body}.mp3`);

    return (await this.client).api.playback.play();
  }
}

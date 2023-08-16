import { Injectable } from '@nestjs/common';
import { Album, YandexMusicClient } from 'yandex-music-client';
import { getTrackUrl } from 'yandex-music-client/trackUrl';

export interface IYandexMusicAuthData {
  userId: number;
  token: string;
  userName: string;
}

@Injectable()
export class YMApiService {
  private baseUrl = 'https://api.music.yandex.net:443';
  private userId: number | undefined;
  private token: string | undefined;

  private client = new YandexMusicClient({
    BASE: this.baseUrl,
    HEADERS: {
      'Accept-Language': 'ru',
    },
  });

  get isAuthorized(): boolean {
    return !!this.token;
  }

  constructor() {}

  setup(config?: IYandexMusicAuthData) {
    if (!config) {
      this.userId = undefined;
      this.token = undefined;
    }

    this.userId = config.userId;
    this.token = config.token;

    this.client = new YandexMusicClient({
      BASE: this.baseUrl,
      HEADERS: {
        Authorization: `OAuth ${this.token}`,
        'Accept-Language': 'ru',
      },
    });
  }

  async setupByToken(token: string) {
    if (!token) {
      this.userId = undefined;
      this.token = undefined;
      return;
    }

    this.token = token;

    this.client = new YandexMusicClient({
      BASE: 'https://api.music.yandex.net:443',
      HEADERS: {
        Authorization: `OAuth ${token}`,
        'Accept-Language': 'ru',
      },
    });

    const status = await this.client.account.getAccountStatus();

    this.userId = status.result.account?.uid;

    return status;
  }

  async signInToken(token: string) {
    return this.setupByToken(token);
  }

  async getTrackUrl(trackId: string) {
    return getTrackUrl(this.client!, trackId);
  }

  async getNewReleases(): Promise<Album[]> {
    const resp = await this.client!.landing.getNewReleases();
    const albumIds = resp.result.newReleases.join(',');
    const albums = await this.client!.albums.getAlbumsByIds({
      'album-ids': albumIds,
    });

    return albums.result;
  }

  async getUserPlaylists() {
    return this.client!.playlists.getPlayLists(this.userId!);
  }

  createAlbumTrackId(track: {
    id: string | number;
    albumId: string | number;
  }): string {
    return `${track.id}:${track.albumId}`;
  }

  createTrackAlbumIds(
    tracks: { id: string | number; albumId: string | number }[],
  ): string[] {
    return tracks.map((track) => this.createAlbumTrackId(track));
  }

  async getLikedTracks() {
    console.log(this.userId)

    const result = await this.client!.tracks.getLikedTracksIds(this.userId!);
    const ids = this.createTrackAlbumIds(result.result.library.tracks);
    const tracks = await this.client.tracks.getTracks({ 'track-ids': ids });

    return tracks;
  }
}

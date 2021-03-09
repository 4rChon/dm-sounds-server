import { Readable } from 'stream';

import PlaylistViewModel from '../view-models/playlist.view-model';
import PlaylistsService from '../services/playlists.service';
import YTDLService from '../services/ytdl.service';
import YTPLService from '../services/ytpl.service';
import IPlaylist from '../controllers/playlists/playlist.interface';

export default class PlaylistsRepository {
  public static getAudioStream(url: string): Readable {
    return YTDLService.getAudioStream(url);
  }

  public static async addPlaylist(model: IPlaylist): Promise<IPlaylist | null> {
    if (YTPLService.validatePlaylist(model.id)) {
      return PlaylistsService.addPlaylist(model);
    }

    return Promise.reject();
  }

  public static async getPlaylists(): Promise<Array<PlaylistViewModel>> {
    const dbResult = await PlaylistsService.getPlaylists() as Array<IPlaylist>;

    return await Promise.all(dbResult.map(async (playlist) => {
      const ytplResult = await YTPLService.getPlaylist(playlist.id);
      return {
        id: playlist.id,
        title: ytplResult.title,
        bestThumbnail: ytplResult.bestThumbnail,
        items: ytplResult.items,
        shuffle: playlist.shuffle,
        loop: playlist.loop,
        replaceAll: playlist.replaceAll
      };
    }));
  }
}
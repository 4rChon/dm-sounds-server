import { Readable } from 'stream';

import ytdlService from '../services/ytdl.service';
import ytplService from '../services/ytpl.service';
import dbService from '../services/mongodb/mongodb';
import { PlaylistFormModel } from '../models/playlist-form.model';
import PlaylistModel from '../models/playlist.model';

class PlaylistRepository {
  public getAudioStream(url: string): Readable {
    return ytdlService.getAudioStream(url);
  }

  public async addPlaylist(model: PlaylistFormModel): Promise<void> {
    if (ytplService.validatePlaylist(model.id)) {
      return dbService.addPlaylist(model);
    }

    return Promise.reject();
  }

  public async getPlaylists(): Promise<Array<PlaylistModel>> {
    const dbResult = await dbService.getPlaylists() as Array<PlaylistFormModel>;

    return await Promise.all(dbResult.map(async (playlist) => {
      const ytplResult = await ytplService.getPlaylist(playlist.id);
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

  public async dispose(): Promise<void> {
    await dbService.close();
  }
}

const service = new PlaylistRepository();
export default service;
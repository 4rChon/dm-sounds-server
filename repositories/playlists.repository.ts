import { Readable } from 'stream';
import { PlaylistModel } from '../models/playlist.interface';
import PlaylistsService from '../services/playlists.service';
import YTDLService from '../services/ytdl.service';
import YTPLService from '../services/ytpl.service';
import { ImportPlaylistViewModel } from '../view-models/import-playlist.view-model';
import { PlaylistViewModel } from '../view-models/playlist.view-model';
import SongsRepository from './songs.repository';

export default class PlaylistsRepository {
  public static getAudioStream(url: string): Readable {
    return YTDLService.getAudioStream(url);
  }

  public static async importPlaylist(model: ImportPlaylistViewModel): Promise<PlaylistViewModel | null> {
    if (!YTPLService.validateID(model.playlist_id)) {
      return Promise.reject('Invalid playlist ID');
    }

    const playlist = await YTPLService.getPlaylist(model.playlist_id);
    const songs = await Promise.all(playlist.items.map(async item => {
      const songModel = {
        song_id: item.id,
        name: item.title,
        loop: false,
        replaceAll: false,
        filters: [],
        thumbnail: item.bestThumbnail.url ?? '',
        colour: '#FFF'
      };
      return (await SongsRepository.importSong(songModel))?._id;
    }));

    return await PlaylistsService.addPlaylist({
      name: playlist.title,
      thumbnail: playlist.bestThumbnail.url ?? '',
      songs,
      filters: model.filters ?? [],
      colour: model.colour ?? 'FFFFFF',
      loop: model.loop,
      shuffle: model.shuffle,
      replaceAll: model.replaceAll
    });
  }

  public static async addPlaylist(model: PlaylistModel): Promise<PlaylistViewModel | null> {
    return PlaylistsService.addPlaylist(model);
  }

  public static async getPlaylists(): Promise<Array<PlaylistViewModel>> {
    return PlaylistsService.getPlaylists();
  }

  public static async getPlaylist(id: string): Promise<PlaylistViewModel | null> {
    return PlaylistsService.getPlaylist(id);
  }

  public static async removePlaylist(id: string): Promise<PlaylistViewModel | null> {
    return PlaylistsService.removePlaylist(id);
  }

  public static async updatePlaylist(model: PlaylistModel): Promise<PlaylistViewModel | null> {
    return PlaylistsService.updatePlaylist(model);
  }
}
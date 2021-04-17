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
    if (!YTPLService.validateID(model.playlistId)) {
      return Promise.reject('Invalid playlist ID');
    }

    const playlist = await YTPLService.getPlaylist(model.playlistId);
    const songs = await Promise.all(playlist.items.map(async item => {
      const songModel = {
        songId: item.id,
        name: item.title,
        loop: false,
        replaceAll: false,
        filters: [],
        thumbnail: item.bestThumbnail.url ?? '',
        colour: '#FFF'
      };
      return (await SongsRepository.importSong(songModel))?._id;
    }));

    const playlistModel: PlaylistModel = {
      name: playlist.title,
      thumbnail: playlist.bestThumbnail.url ?? '',
      songs,
      filters: model.filters ?? [],
      colour: model.colour ?? '#FFF',
      loop: model.loop,
      shuffle: model.shuffle,
      replaceAll: model.replaceAll
    };

    return await PlaylistsService.addPlaylist(playlistModel);
  }

  public static async addPlaylist(model: PlaylistModel): Promise<PlaylistViewModel | null> {
    const playlistModel: PlaylistModel = {
      name: model.name,
      thumbnail: model.thumbnail ?? '',
      songs: model.songs ?? [],
      filters: model.filters ?? [],
      colour: model.colour ?? '#FFF',
      loop: model.loop,
      shuffle: model.shuffle,
      replaceAll: model.replaceAll
    };

    return PlaylistsService.addPlaylist(playlistModel);
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
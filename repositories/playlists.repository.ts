import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import IPlaylist from '../models/playlist.interface';
import FiltersService from '../services/filters.service';
import PlaylistsService from '../services/playlists.service';
import YTDLService from '../services/ytdl.service';
import YTPLService from '../services/ytpl.service';
import ImportPlaylistViewModel from '../view-models/import-playlist.view-model';
import PlaylistViewModel from '../view-models/playlist.view-model';
import SongsRepository from './songs.repository';

export default class PlaylistsRepository {
  public static getAudioStream(url: string): Readable {
    return YTDLService.getAudioStream(url);
  }

  public static async importPlaylist(model: ImportPlaylistViewModel): Promise<IPlaylist | null> {
    if (!YTPLService.validatePlaylist(model.id)) {
      return Promise.reject('Invalid playlist ID');
    }

    const playlist = await YTPLService.getPlaylist(model.id);
    const songs = await Promise.all(playlist.items.map(async item => {
      const songModel = {
        id: item.id,
        name: item.title,
        loop: false,
        replaceAll: false,
        filters: [],
        thumbnail: item.bestThumbnail.url ?? '',
        colour: '#FFFFFF'
      };
      await SongsRepository.addSong(songModel);
      return item.id;
    }));

    return await PlaylistsService.addPlaylist({
      id: uuidv4(),
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

  public static async addPlaylist(model: IPlaylist): Promise<IPlaylist | null> {
    if (!(await FiltersService.validateFilters(model.filters))) {
      return Promise.reject('Invalid filters');
    }

    model.id = uuidv4();
    return PlaylistsService.addPlaylist(model);
  }

  public static async getPlaylists(): Promise<Array<PlaylistViewModel>> {
    const playlists = await PlaylistsService.getPlaylists();

    return await Promise.all(playlists.map(async (playlist) => {
      const filters = await FiltersService.getFiltersByNames(playlist.filters);
      const songs = await SongsRepository.getSongsByIDs(playlist.songs);
      return {
        id: playlist.id,
        name: playlist.name,
        thumbnail: playlist.thumbnail,
        songs,
        filters,
        colour: playlist.colour,
        shuffle: playlist.shuffle,
        loop: playlist.loop,
        replaceAll: playlist.replaceAll
      };
    }));
  }

  public static async getPlaylistsByIDs(ids: Array<string>): Promise<Array<PlaylistViewModel>> {
    const playlists = await PlaylistsService.getPlaylistsByIDs(ids);

    return await Promise.all(playlists.map(async (playlist) => {
      const filters = await FiltersService.getFiltersByNames(playlist.filters);
      const songs = await SongsRepository.getSongsByIDs(playlist.songs);
      return {
        id: playlist.id,
        name: playlist.name,
        thumbnail: playlist.thumbnail,
        songs,
        filters,
        colour: playlist.colour,
        shuffle: playlist.shuffle,
        loop: playlist.loop,
        replaceAll: playlist.replaceAll
      };
    }));
  }

  public static async getPlaylist(id: string): Promise<PlaylistViewModel | null> {
    const playlist = await PlaylistsService.getPlaylist(id);
    if (!playlist) {
      return Promise.reject('Playlist not found');
    }

    const filters = await FiltersService.getFiltersByNames(playlist.filters);
    const songs = await SongsRepository.getSongsByIDs(playlist.songs);
    return {
      id: playlist.id,
      name: playlist.name,
      thumbnail: playlist.thumbnail,
      songs,
      filters,
      colour: playlist.colour,
      shuffle: playlist.shuffle,
      loop: playlist.loop,
      replaceAll: playlist.replaceAll
    };
  }

  public static async removePlaylist(id: string): Promise<IPlaylist | null> {
    return PlaylistsService.removePlaylist(id);
  }

  public static async updatePlaylist(id: string, model: IPlaylist): Promise<IPlaylist | null> {
    if (!(await FiltersService.validateFilters(model.filters))) {
      return Promise.reject('Invalid filters');
    }

    return PlaylistsService.updatePlaylist(id, model);
  }
}
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import PlaylistViewModel from '../view-models/playlist.view-model';
import PlaylistsService from '../services/playlists.service';
import YTDLService from '../services/ytdl.service';
import YTPLService from '../services/ytpl.service';
import IPlaylist from '../controllers/playlists/playlist.interface';
import ColoursService from '../services/colours.service';
import FiltersService from '../services/filters.service';
import SongsRepository from './songs.repository';

export default class PlaylistsRepository {
  public static getAudioStream(url: string): Readable {
    return YTDLService.getAudioStream(url);
  }

  public static async importPlaylist(id: string): Promise<IPlaylist | null> {
    if (!YTPLService.validatePlaylist(id)) {
      return Promise.reject('Invalid playlist ID');
    }

    const playlist = await YTPLService.getPlaylist(id);
    const songs = await Promise.all(playlist.items.map(async item => {
      const songModel = {
        id: item.id,
        name: item.title,
        loop: false,
        filters: [],
        thumbnail: item.bestThumbnail.url ?? '',
        colour: { r: 1, g: 1, b: 1 }
      };
      await SongsRepository.addSong(songModel);
      return item.id;
    }));

    return await PlaylistsService.addPlaylist({
      id: uuidv4(),
      name: playlist.title,
      thumbnail: playlist.bestThumbnail.url ?? '',
      songs,
      filters: [],
      colour: { r: 1, g: 1, b: 1 },
      loop: false,
      shuffle: false,
      replaceAll: false
    });
  }

  public static async addPlaylist(model: IPlaylist): Promise<IPlaylist | null> {
    if (!ColoursService.validateColor(model.colour)) {
      return Promise.reject('Colour values not within the range [0-1]');
    }

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
    if (!ColoursService.validateColor(model.colour)) {
      return Promise.reject('Colour values not within the range [0-1]');
    }

    if (!(await FiltersService.validateFilters(model.filters))) {
      return Promise.reject('Invalid filters');
    }

    return PlaylistsService.updatePlaylist(id, model);
  }
}
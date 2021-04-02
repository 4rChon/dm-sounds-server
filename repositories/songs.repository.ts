import ISong from "../models/song.interface";
import FiltersService from "../services/filters.service";
import SongsService from "../services/songs.service";
import YTDLService from "../services/ytdl.service";
import SongViewModel from "../view-models/song.view-model";

export default class SongsRepository {
  public static async addSong(model: ISong): Promise<ISong | null> {
    // move validation to db level
    if (!YTDLService.validateID(model.id)) {
      return Promise.reject('Invalid song ID');
    }

    if (!(await FiltersService.validateFilters(model.filters))) {
      return Promise.reject('Invalid filters');
    }

    return SongsService.addSong(model);
  }

  public static async getSongs(): Promise<Array<SongViewModel>> {
    const songs = await SongsService.getSongs();

    return Promise.all(songs.map(async song => {
      const filters = await FiltersService.getFiltersByNames(song.filters);
      return { id: song.id, loop: song.loop, replaceAll: song.replaceAll, name: song.name, filters, colour: song.colour };
    }));
  }

  public static async getSongsByIDs(ids: Array<string>): Promise<Array<SongViewModel>> {
    const songs = await SongsService.getSongsByIDs(ids);

    return Promise.all(songs.map(async song => {
      const filters = await FiltersService.getFiltersByNames(song.filters);
      return { id: song.id, loop: song.loop, replaceAll: song.replaceAll, name: song.name, filters, colour: song.colour };
    }));
  }

  public static async getSong(id: string): Promise<SongViewModel | null> {
    const song = await SongsService.getSong(id);
    if (!song) {
      return Promise.reject('Song not found');
    }

    const filters = await FiltersService.getFiltersByNames(song.filters);
    return { id: song.id, loop: song.loop, replaceAll: song.replaceAll, name: song.name, filters, colour: song.colour };
  }

  public static async removeSong(id: string): Promise<ISong | null> {
    return SongsService.removeSong(id);
  }

  public static async updateSong(id: string, model: ISong): Promise<ISong | null> {
    if (!YTDLService.validateID(model.id)) {
      return Promise.reject('Invalid song ID');
    }

    if (!(await FiltersService.validateFilters(model.filters))) {
      return Promise.reject('Invalid filters');
    }

    return SongsService.updateSong(id, model);
  }
}
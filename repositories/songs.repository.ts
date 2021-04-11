import { SongModel } from "../models/song.interface";
import SongsService from "../services/songs.service";
import YTDLService from "../services/ytdl.service";
import { SongViewModel } from "../view-models/song.view-model";

export default class SongsRepository {
  public static async importSong(song: SongModel): Promise<SongViewModel | null> {
    const ytVideoInfo = await YTDLService.getBasicInfo(song.song_id);
    const thumbnails = ytVideoInfo.player_response.videoDetails.thumbnail.thumbnails;
    song.thumbnail = thumbnails[0]?.url ?? '';

    return SongsService.addSong(song);
  }

  public static async updateSong(song: SongModel): Promise<SongViewModel | null> {
    if (!song._id) {
      return Promise.reject('Cannot update document with no _id value');
    }
    return SongsService.updateSong(song);
  }

  public static async getSongs(): Promise<Array<SongViewModel>> {
    return SongsService.getSongs();
  }

  public static async getSong(id: string): Promise<SongViewModel | null> {
    const song = await SongsService.getSong(id);
    if (!song) {
      return Promise.reject('Song not found');
    }

    return song;
  }

  public static async removeSong(id: string): Promise<SongViewModel | null> {
    return SongsService.removeSong(id);
  }
}
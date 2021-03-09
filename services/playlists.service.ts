import IPlaylist from '../controllers/playlists/playlist.interface';
import PlaylistModel from '../models/playlist.model';

export default class PlaylistsService {
  public static async addPlaylist(playlist: IPlaylist): Promise<IPlaylist | null> {
    return PlaylistModel.findOneAndUpdate(
      { id: playlist.id }, playlist, { upsert: true }
    ).exec();
  }

  public static async getPlaylists(): Promise<Array<IPlaylist>> {
    return PlaylistModel.find().exec();
  }
}
import PlaylistModelInterface from '../controllers/playlists/playlist.interface';
import PlaylistModel from '../models/playlist.model';

export default class PlaylistService {
  public static async addPlaylist(playlist: PlaylistModelInterface): Promise<PlaylistModelInterface | null> {
    return PlaylistModel.findOneAndUpdate(
      { id: playlist.id }, playlist, { upsert: true }
    ).exec();
  }

  public static async getPlaylists(): Promise<Array<PlaylistModelInterface>> {
    return PlaylistModel.find().exec();
  }
}
import IPlaylist from '../controllers/playlists/playlist.interface';
import playlistModel from '../models/playlist.model';

export default class PlaylistsService {
  public static async addPlaylist(playlist: IPlaylist): Promise<IPlaylist | null> {
    return playlistModel.findOneAndUpdate(
      { id: playlist.id }, playlist, { upsert: true }
    ).exec();
  }

  public static async getPlaylists(): Promise<Array<IPlaylist>> {
    return playlistModel.find().exec();
  }

  public static async getPlaylistsByIDs(ids: Array<string>): Promise<Array<IPlaylist>> {
    return playlistModel.find().where('id').in(ids).exec();
  }

  public static async getPlaylist(id: string): Promise<IPlaylist | null> {
    return playlistModel.findOne({ id }).exec();
  }

  public static async removePlaylist(id: string): Promise<IPlaylist | null> {
    return playlistModel.findOneAndDelete({ id }).exec();
  }

  public static async updatePlaylist(id: string, playlist: IPlaylist): Promise<IPlaylist | null> {
    return playlistModel.findOneAndUpdate({ id }, playlist, { new: true }).exec();
  }
}
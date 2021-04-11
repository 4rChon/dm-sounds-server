import { PlaylistModel } from "../models/playlist.interface";
import playlistModel, { PlaylistLean } from "../mongodb/models/playlist.model";

export default class PlaylistsService {
  public static async addPlaylist(playlist: PlaylistModel): Promise<PlaylistLean | null> {
    return playlistModel.create(playlist);
  }

  public static async updatePlaylist(playlist: PlaylistModel): Promise<PlaylistLean | null> {
    return playlistModel.findOneAndUpdate(
      { _id: playlist._id }, playlist, { new: true }
    ).lean().exec();
  }

  public static async getPlaylists(): Promise<Array<PlaylistLean>> {
    return playlistModel.find().lean().exec();
  }

  public static async getPlaylist(id: string): Promise<PlaylistLean | null> {
    return playlistModel.findOne({ _id: id }).lean().exec();
  }

  public static async removePlaylist(id: string): Promise<PlaylistLean | null> {
    return playlistModel.findOneAndDelete({ _id: id }).lean().exec();
  }
}
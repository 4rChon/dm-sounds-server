import { PlaylistModel } from "../models/playlist.interface";
import playlistModel, { PlaylistLean } from "../mongodb/models/playlist.model";

export default class PlaylistsService {
  public static async addPlaylist(playlist: PlaylistModel): Promise<PlaylistLean | null> {
    return playlistModel.create(playlist);
  }

  public static async updatePlaylist(playlist: PlaylistModel): Promise<PlaylistLean | null> {
    //@ts-ignore
    return playlistModel.findOneAndUpdate(
      { _id: playlist._id },
      //@ts-ignore
      playlist, { new: true }
    ).lean().exec();
  }

  public static async getPlaylists(): Promise<Array<PlaylistLean>> {
    //@ts-ignore
    return playlistModel.find().populate('filters').populate('songs').lean().exec();
  }

  public static async getPlaylist(id: string): Promise<PlaylistLean | null> {
    //@ts-ignore
    return playlistModel.findOne({ _id: id }).populate('filters').populate('songs').lean().exec();
  }

  public static async removePlaylist(id: string): Promise<PlaylistLean | null> {
    //@ts-ignore
    return playlistModel.findOneAndDelete({ _id: id }).lean().exec();
  }
}
import { SongModel } from "../models/song.interface";
import songModel, { SongLean } from "../mongodb/models/song.model";

export default class SongsService {
  public static async addSong(song: SongModel): Promise<SongLean | null> {
    return songModel.create(song);
  }

  public static async updateSong(song: SongModel): Promise<SongLean | null> {
    return songModel.findOneAndUpdate(
      { _id: song._id }, song, { new: true }
    ).lean().exec();
  }

  public static async getSongs(): Promise<Array<SongLean>> {
    return songModel.find().populate('filters').lean().exec();
  }

  public static async getSong(id: string): Promise<SongLean | null> {
    return songModel.findOne({ _id: id }).populate('filters').lean().exec();
  }

  public static async removeSong(id: string): Promise<SongLean | null> {
    return songModel.findOneAndDelete({ _id: id }).exec();
  }
}
import ISong from "../controllers/songs/song.interface";
import songModel from "../models/song.model";

export default class SongsService {
  public static async addSong(song: ISong): Promise<ISong | null> {
    return songModel.findOneAndUpdate(
      { id: song.id }, song, { upsert: true }
    ).exec();
  }

  public static async getSongs(): Promise<Array<ISong>> {
    return songModel.find().exec();
  }

  public static async getSongsByIDs(ids: Array<string>): Promise<Array<ISong>> {
    return songModel.find().where('id').in(ids).exec();
  }

  public static async getSong(id: string): Promise<ISong | null> {
    return songModel.findOne({ id }).exec();
  }

  public static async removeSong(id: string): Promise<ISong | null> {
    return songModel.findOneAndDelete({ id }).exec();
  }

  public static async updateSong(id: string, song: ISong): Promise<ISong | null> {
    return songModel.findOneAndUpdate({ id }, song, { new: true }).exec();
  }
}
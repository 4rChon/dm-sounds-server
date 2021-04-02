import { model, Schema } from "mongoose";
import IPlaylistModel from '../interfaces/playlist.model.interface';
import Validators from "../validators/validators";

export const playlistSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  name: String,
  thumbnail: String,
  songs: [String],
  filters: [String],
  colour: {
    type: String,
    validate: Validators.Colour,
  },
  loop: Boolean,
  shuffle: Boolean,
  replaceAll: Boolean
});

export default model<IPlaylistModel>('Playlist', playlistSchema);
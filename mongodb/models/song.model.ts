import { model, Schema } from "mongoose";
import ISongModel from '../interfaces/song.model.interface';
import Validators from "../validators/validators";

export const songSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  url: String,
  name: String,
  thumbnail: String,
  filters: [String],
  colour: {
    type: String,
    validate: Validators.Colour,
  },
  loop: Boolean,
  replaceAll: Boolean,
});

export default model<ISongModel>('Song', songSchema);
import { Document, model, Schema } from "mongoose";
import Validators from "../validators/validators";
import { FilterDocument, FilterLean } from "./filter.model";

export interface SongLean {
  _id?: string;
  song_id: string;
  name: string;
  loop: boolean;
  replaceAll: boolean;
  filters: Array<FilterLean>;
  thumbnail: string;
  colour: string;
}

export interface SongDocument extends Document {
  song_id: string;
  name: string;
  loop: boolean;
  replaceAll: boolean;
  filters: Array<FilterDocument['_id']>;
  thumbnail: string;
  colour: string;
}

export const songSchema = new Schema({
  song_id: {
    type: String,
    unique: true,
    required: true,
    validate: Validators.SongID
  },
  name: {
    type: String,
    required: true
  },
  thumbnail: String,
  filters: [{ type: String, ref: 'Filter' }],
  colour: {
    type: String,
    validate: Validators.Colour,
    required: true,
    default: '#fff'
  },
  loop: {
    type: Boolean,
    default: false
  },
  replaceAll: {
    type: Boolean,
    default: false
  }
});

export default model<SongDocument>('Song', songSchema);
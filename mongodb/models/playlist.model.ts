import { Document, model, Schema } from "mongoose";
import Validators from "../validators/validators";
import { FilterDocument, FilterLean } from "./filter.model";
import { SongDocument, SongLean } from "./song.model";

export interface PlaylistLean {
  _id?: string;
  name: string;
  thumbnail: string;
  songs: Array<SongLean>;
  filters: Array<FilterLean>;
  colour: string;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}

export interface PlaylistDocument extends Document {
  name: string;
  thumbnail: string;
  songs: Array<SongDocument['_id']>;
  filters: Array<FilterDocument['_id']>;
  colour: string;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}

export const playlistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  thumbnail: String,
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  filters: [{ type: Schema.Types.ObjectId, ref: 'Filter' }],
  colour: {
    type: String,
    required: true,
    validate: Validators.Colour,
    default: '#fff'
  },
  loop: {
    type: Boolean,
    default: false
  },
  shuffle: {
    type: Boolean,
    default: false
  },
  replaceAll: {
    type: Boolean,
    default: false
  }
});

export default model<PlaylistDocument>('Playlist', playlistSchema);
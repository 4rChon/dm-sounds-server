import mongoose, { Schema, Document } from 'mongoose';
import IPlaylist from '../controllers/playlists/playlist.interface';
import { colourSchema } from './colour.model';

const playlistSchema = new Schema({
  id: { type: String, index: true },
  name: String,
  thumbnail: String,
  songs: [String],
  filters: [String],
  colour: colourSchema,
  loop: Boolean,
  shuffle: Boolean,
  replaceAll: Boolean
});

export default mongoose.model<IPlaylist & Document>('Playlist', playlistSchema);
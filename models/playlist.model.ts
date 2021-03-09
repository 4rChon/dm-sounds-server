import mongoose, { Schema, Document } from 'mongoose';
import IPlaylist from '../controllers/playlists/playlist.interface';

const playlistSchema = new Schema({
  id: { type: String, index: true },
  shuffle: Boolean,
  loop: Boolean,
  replaceAll: Boolean
});

export default mongoose.model<IPlaylist & Document>('Playlist', playlistSchema);
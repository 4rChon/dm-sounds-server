import mongoose from 'mongoose';
import Playlist from '../controllers/playlists/playlist.interface';

const playlistSchema = new mongoose.Schema({
  id: { type: String, index: true },
  shuffle: Boolean,
  loop: Boolean,
  replaceAll: Boolean
});

export default mongoose.model<Playlist & mongoose.Document>('Playlist', playlistSchema);
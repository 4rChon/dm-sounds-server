import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  id: { type: String, index: true },
  title: String,
  shuffle: Boolean,
  loop: Boolean,
  replaceAll: Boolean
});

export default mongoose.model('Playlist', playlistSchema);
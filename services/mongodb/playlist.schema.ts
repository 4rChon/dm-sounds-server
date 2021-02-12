import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  id: { type: String, index: true },
  title: String,
  bestThumbnail: {
    url: String,
    width: Number,
    height: Number
  },
  items: [{
    title: String,
    index: Number,
    id: String,
    shortUrl: String,
    url: String,
    author: {
      name: String,
      url: String,
      channelID: String,
    },
    thumbnails: [{
      url: String,
      width: Number,
      height: Number
    }],
    bestThumbnail: {
      url: String,
      width: Number,
      height: Number
    },
    isLive: Boolean,
    duration: String,
    durationSec: Number
  }]
});

export default mongoose.model('Playlist', playlistSchema);
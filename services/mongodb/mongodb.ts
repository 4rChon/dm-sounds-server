import mongoose from "mongoose";
import PlaylistModel from "../../models/playlist.model";
import Playlist from "./playlist.schema";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1esps.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "[database]: Database connection error:"));
db.once("once", () => {
  console.log("[database]: Database connected!");
});

async function addPlaylist(playlist: PlaylistModel): Promise<void> {
  try {
    await Playlist.findOneAndUpdate(
      { id: playlist.id },
      {
        id: playlist.id,
        title: playlist.title,
        bestThumbnail: playlist.bestThumbnail,
        items: playlist.items
      },
      { upsert: true }
    ).exec();
  } catch (err) {
    console.error(`[database]: ${err}`);
  }
}

async function getPlaylists(): Promise<PlaylistModel[]> {
  try {
    return (await Playlist.find().exec()) as any as PlaylistModel[];
  } catch (err) {
    console.error(`[database]: ${err}`);
    return [];
  }
}

async function close(): Promise<void> {
  try {
    await db.close();
  } catch (err) {
    console.error(`[database]: ${err}`);
  }
}

export default {
  close,
  addPlaylist,
  getPlaylists
}
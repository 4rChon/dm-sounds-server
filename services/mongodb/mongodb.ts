import mongoose from "mongoose";
import { PlaylistFormModel } from "../../models/playlist-form.model";
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

async function addPlaylist(playlist: PlaylistFormModel): Promise<void> {
  await Playlist.findOneAndUpdate(
    { id: playlist.id }, playlist, { upsert: true }
  ).exec();
}

async function getPlaylists(): Promise<Array<PlaylistFormModel>> {
  return (await Playlist.find().exec()) as any as Array<PlaylistFormModel>;
}

async function close(): Promise<void> {
  await db.close();
}

export default {
  close,
  addPlaylist,
  getPlaylists
}
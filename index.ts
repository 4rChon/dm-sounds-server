import express from "express";
import ytdl from "ytdl-core";
import ytpl, { Image, Item } from "ytpl";
import cors from "cors";
import { Readable } from "stream";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

interface PlaylistModel {
  id: string;
  title: string;
  bestThumbnail: Image;
  items: Array<Item>;
}

function getAudioStream(url: string): Readable {
  return ytdl(url, {
    quality: "highestaudio",
    filter: "audioonly",
  });
}

async function getPlaylistUrls(url: string): Promise<PlaylistModel> {
  return (await ytpl(url)) as PlaylistModel;
}

app.get("/playlist/:url", (req, res) => {
  console.log(req.params.url);
  getPlaylistUrls(req.params.url)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/stream/:url", (req, res) => {
  try {
    getAudioStream(`https://www.youtube.com/watch?v=${req.params.url}`).pipe(res);
  } catch (err) {
    res.send(err);
    res.end();
  }
});

app.get("/", (req, res) => {
  console.log("Hello world!");
});

const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`[server]: Server is running`);
});

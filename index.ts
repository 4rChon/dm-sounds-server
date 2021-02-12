import express from "express";
import cors from "cors";
import ytpl from "./services/ytpl";
import ytdl from "./services/ytdl";
import { AddressInfo } from "net";
import PlaylistModel from "./models/playlist.model"
import mongodb from "./services/mongodb/mongodb";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.post("/playlist/", async (req, res) => {
  try {
    const playlist: PlaylistModel = await ytpl.getPlaylist(req.body.url);
    await mongodb.addPlaylist(playlist);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get("/playlist/", async (req, res) => {
  try {
    res.send(await mongodb.getPlaylists());
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.get("/stream/:url", (req, res) => {
  try {
    ytdl.getAudioStream(`https://www.youtube.com/watch?v=${req.params.url}`).pipe(res);
  } catch (err) {
    res.send(err).sendStatus(500).end();
  }
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const server = app.listen(process.env.PORT || PORT, () => {
  const address = server.address() as AddressInfo;
  console.log(`[server]: Server is running at ${address.address}:${address.port}`);
});

server.on('close', async () => {
  await mongodb.close();
})
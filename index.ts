import cors from "cors";
import express from "express";
import { AddressInfo } from "net";
import playlistRepository from "./repositories/playlist.repository";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.post("/playlist/", async (req, res) => {
  try {
    await playlistRepository.addPlaylist(req.body);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get("/playlist/", async (req, res) => {
  try {
    res.send(await playlistRepository.getPlaylists());
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.get("/stream/:url", (req, res) => {
  try {
    playlistRepository.getAudioStream(`https://www.youtube.com/watch?v=${req.params.url}`).pipe(res);
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
  await playlistRepository.dispose();
})
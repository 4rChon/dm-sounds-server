import express from "express";
import cors from "cors";
import ytpl from "./services/ytpl";
import ytdl from "./services/ytdl";
import { AddressInfo } from "net";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/playlist/:url", (req, res) => {
  console.log(req.params.url);
  ytpl.getPlaylistUrls(req.params.url)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/stream/:url", (req, res) => {
  try {
    ytdl.getAudioStream(`https://www.youtube.com/watch?v=${req.params.url}`).pipe(res);
  } catch (err) {
    res.send(err);
    res.end();
  }
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const server = app.listen(process.env.PORT || PORT, () => {
  const address = server.address() as AddressInfo;
  console.log(`[server]: Server is running at ${address.address}:${address.port}`);
});

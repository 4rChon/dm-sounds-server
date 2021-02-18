import { Readable } from "stream";
import ytdl from "ytdl-core";

class ytdlService {
  public getAudioStream(url: string): Readable {
    return ytdl(url, {
      quality: "highestaudio",
      filter: "audioonly",
    });
  }
}

const service = new ytdlService();
export default service;
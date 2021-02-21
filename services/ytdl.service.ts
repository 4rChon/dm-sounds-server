import { Readable } from 'stream';
import ytdl from 'ytdl-core';

export default class YTDLService {
  public static getAudioStream(url: string): Readable {
    return ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
    });
  }
}
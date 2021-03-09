import { Readable } from 'stream';
import ytdl from 'ytdl-core';

export default class YTDLService {
  public static getAudioStream(url: string): Readable {
    return ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
    });
  }

  public static validateID(id: string): boolean {
    return ytdl.validateID(id);
  }

  public static validateURL(url: string): boolean {
    return ytdl.validateURL(url);
  }
}
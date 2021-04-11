import { Readable } from 'stream';
import ytdl, { videoInfo } from 'ytdl-core';

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

  public static async getBasicInfo(id: string): Promise<videoInfo> {
    return ytdl.getBasicInfo(id);
  }
}
import ytpl, { Result } from 'ytpl';

export default class YTPLService {
  public static async getPlaylist(id: string): Promise<Result> {
    return ytpl(id);
  }

  public static validateID(id: string): boolean {
    return ytpl.validateID(id);
  }
}
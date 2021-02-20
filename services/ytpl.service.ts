import ytpl, { Result } from "ytpl";

class ytplService {
  public async getPlaylist(id: string): Promise<Result> {
    return ytpl(id);
  }

  public validatePlaylist(id: string): boolean {
    return ytpl.validateID(id);
  }
}

const service = new ytplService();
export default service;
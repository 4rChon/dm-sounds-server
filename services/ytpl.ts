import ytpl from "ytpl";
import PlaylistModel from "../models/playlist.model";

class ytplService {
  public async getPlaylist(url: string): Promise<PlaylistModel> {
    return (await ytpl(url)) as PlaylistModel;
  }
}

const service = new ytplService();
export default service;
import { PlaylistViewModel } from "./playlist.view-model";
import { SongViewModel } from "./song.view-model";

export interface CampaignViewModel {
  _id?: string;
  name: string;
  playlists: Array<PlaylistViewModel>;
  songs: Array<SongViewModel>;
}
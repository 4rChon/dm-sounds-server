import { PlaylistModel } from './playlist.interface';
import { SongModel } from './song.interface';

export interface CampaignModel {
  _id?: string;
  name: string;
  playlists: Array<PlaylistModel['_id']>;
  songs: Array<SongModel['_id']>;
}
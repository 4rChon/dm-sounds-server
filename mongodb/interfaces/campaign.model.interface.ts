import { Document } from 'mongoose';
import IPlaylistModel from './playlist.model.interface';
import ISongModel from './song.model.interface';

export default interface ICampaignModel extends Document {
  id: string;
  name: string;
  playlists: Array<IPlaylistModel['id']>;
  songs: Array<ISongModel['id']>;
}
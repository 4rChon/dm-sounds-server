import { FilterModel } from './filter.interface';
import { SongModel } from './song.interface';

export interface PlaylistModel {
  _id?: string;
  name: string;
  thumbnail: string;
  songs: Array<SongModel['_id']>;
  filters: Array<FilterModel['_id']>;
  colour: string;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}
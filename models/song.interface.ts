import { FilterModel } from './filter.interface';

export interface SongModel {
  _id?: string;
  song_id: string;
  name: string;
  loop: boolean;
  replaceAll: boolean;
  filters: Array<FilterModel['_id']>;
  thumbnail: string;
  colour: string;
}
import { FilterViewModel } from './filter.view-model';
import { SongViewModel } from './song.view-model';

export interface PlaylistViewModel {
  _id?: string;
  name: string;
  thumbnail: string;
  songs: Array<SongViewModel>;
  filters: Array<FilterViewModel>;
  colour: string;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}
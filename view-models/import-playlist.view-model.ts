import { FilterViewModel } from './filter.view-model';

export interface ImportPlaylistViewModel {
  playlistId: string;
  name: string;
  thumbnail: string;
  filters: Array<FilterViewModel['_id']>;
  colour: string;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}
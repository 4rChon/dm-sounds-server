import { FilterViewModel } from './filter.view-model';

export interface ImportPlaylistViewModel {
  playlist_id: string;
  name: string;
  thumbnail: string;
  filters: Array<FilterViewModel['_id']>;
  colour: string;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}
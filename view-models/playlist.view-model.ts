import IFilter from '../models/filter.interface';
import SongViewModel from './song.view-model';

export default interface PlaylistViewModel {
  id: string;
  name: string;
  thumbnail: string;
  songs: Array<SongViewModel>;
  filters: Array<IFilter>;
  colour: string;
  shuffle: boolean;
  loop: boolean;
  replaceAll: boolean;
}
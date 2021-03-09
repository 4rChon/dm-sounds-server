import IColour from '../controllers/colours/colour.interface';
import IFilter from '../controllers/filters/filter.interface';
import SongViewModel from './song.view-model';

export default interface PlaylistViewModel {
  id: string;
  name: string;
  thumbnail: string;
  songs: Array<SongViewModel>;
  filters: Array<IFilter>;
  colour: IColour;
  shuffle: boolean;
  loop: boolean;
  replaceAll: boolean;
}
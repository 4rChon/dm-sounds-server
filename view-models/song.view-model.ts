import IColour from '../controllers/colours/colour.interface';
import IFilter from '../controllers/filters/filter.interface';

export default interface SongViewModel {
  id: string;
  loop: boolean;
  replaceAll: boolean;
  name: string;
  filters: Array<IFilter>;
  colour: IColour;
}
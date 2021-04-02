import IFilter from './filter.interface';
import ISong from './song.interface';

export default interface IPlaylist {
  id: string;
  name: string;
  thumbnail: string;
  songs: Array<ISong['id']>;
  filters: Array<IFilter['name']>;
  colour: string;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}
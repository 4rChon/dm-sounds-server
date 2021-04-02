import IFilter from './filter.interface';

export default interface ISong {
  id: string;
  name: string;
  loop: boolean;
  replaceAll: boolean;
  filters: Array<IFilter['name']>;
  thumbnail: string;
  colour: string;
}
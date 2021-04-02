import IFilter from "../models/filter.interface";

export default interface SongViewModel {
  id: string;
  loop: boolean;
  replaceAll: boolean;
  name: string;
  filters: Array<IFilter>;
  colour: string;
}
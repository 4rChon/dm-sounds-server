import { FilterViewModel } from "./filter.view-model";

export interface SongViewModel {
  _id?: string;
  songId: string;
  name: string;
  loop: boolean;
  replaceAll: boolean;
  filters: Array<FilterViewModel>;
  thumbnail: string;
  colour: string;
}
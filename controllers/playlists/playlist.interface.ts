import IColour from "../colours/colour.interface";
import IFilter from "../filters/filter.interface";
import ISong from "../songs/song.interface";

export default interface IPlaylist {
  id: string;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
  songs: Array<ISong>;
  filters: Array<IFilter>;
  color: IColour;
  name: string;
  thumbnail: string;
}
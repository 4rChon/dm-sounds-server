import IColour from "../colours/colour.interface";

export default interface IPlaylist {
  id: string;
  name: string;
  thumbnail: string;
  songs: Array<string>;
  filters: Array<string>;
  colour: IColour;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}
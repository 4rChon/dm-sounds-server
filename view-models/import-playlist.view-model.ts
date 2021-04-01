import IColour from "../controllers/colours/colour.interface";

export default interface ImportPlaylistViewModel {
  id: string;
  filters: Array<string>;
  colour: IColour;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}
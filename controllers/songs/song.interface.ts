import IColour from "../colours/colour.interface";

export default interface ISong {
  id: string;
  name: string;
  loop: boolean;
  filters: Array<string>;
  thumbnail: string;
  colour: IColour;
}
import IColour from "../colours/colour.interface";

export default interface ISong {
  id: string;
  loop: boolean;
  name: string;
  filters: Array<string>;
  colour: IColour;
}
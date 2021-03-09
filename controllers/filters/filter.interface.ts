import IColour from "../colours/colour.interface";

export default interface IFilter {
  name: string;
  colour: IColour;
}
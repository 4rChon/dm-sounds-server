import IColour from "../colours/colour.interface";
import IFilter from "../filters/filter.interface";

export default interface ISong {
  id: string;
  loop: boolean;
  url: string;
  name: string;
  filters: Array<IFilter>;
  color: IColour;
}
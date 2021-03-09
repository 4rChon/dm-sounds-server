import IColour from "../controllers/colours/colour.interface";

export default class ColoursService {
  public static validateColor(colour: IColour): boolean {
    return colour.r >= 0 && colour.r <= 1 && colour.g >= 0 && colour.g <= 1 && colour.b >= 0 && colour.b <= 1;
  }
}
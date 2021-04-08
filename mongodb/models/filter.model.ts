import { model, Schema } from "mongoose";
import IFilterModel from "../interfaces/filter.model.interface";
import Validators from "../validators/validators";

export const filterSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  colour: {
    type: String,
    validate: Validators.Colour,
    required: true
  },
});

export default model<IFilterModel>('Filter', filterSchema);
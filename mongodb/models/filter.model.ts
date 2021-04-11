import { model, Schema, Document, LeanDocument, ObjectId } from "mongoose";
import Validators from "../validators/validators";

export interface FilterLean {
  _id?: string;
  name: string;
  colour: string;
}

export interface FilterDocument extends Document {
  name: string;
  colour: string;
}

export const filterSchema = new Schema({
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

export default model<FilterDocument>('Filter', filterSchema);
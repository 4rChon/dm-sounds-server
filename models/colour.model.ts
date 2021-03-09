import mongoose, { Schema, Document } from 'mongoose';
import IColour from '../controllers/colours/colour.interface';

export const colourSchema = new Schema({
  r: Number,
  g: Number,
  b: Number
});

export default mongoose.model<IColour & Document>('Colour', colourSchema);
import mongoose, { Schema, Document } from 'mongoose';
import IFilter from '../controllers/filters/filter.interface';
import { colourSchema } from './colour.model';

export const filterSchema = new Schema({
  name: String,
  colour: colourSchema
});

export default mongoose.model<IFilter & Document>('Filter', filterSchema);
import mongoose from 'mongoose';
import IFilter from '../controllers/filters/filter.interface';

const filterSchema = new mongoose.Schema({
  name: String,
  colour: {
    r: Number,
    g: Number,
    b: Number
  }
});

export default mongoose.model<IFilter & mongoose.Document>('Filter', filterSchema);
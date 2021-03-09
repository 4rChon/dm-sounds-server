import mongoose, { Schema, Document } from 'mongoose';
import ISong from '../controllers/songs/song.interface';
import { colourSchema } from './colour.model';

const songSchema = new Schema({
  id: String,
  url: String,
  name: String,
  loop: Boolean,
  filters: [String],
  colour: colourSchema
});

export default mongoose.model<ISong & Document>('Song', songSchema);
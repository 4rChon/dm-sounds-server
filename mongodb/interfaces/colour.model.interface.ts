import { Document } from 'mongoose';

export default interface IColourModel extends Document {
  colour: string
}
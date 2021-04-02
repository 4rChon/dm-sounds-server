import { Document } from 'mongoose';
import IColourModel from './colour.model.interface';

export default interface IFilterModel extends Document {
  name: string;
  colour: IColourModel['colour'];
}
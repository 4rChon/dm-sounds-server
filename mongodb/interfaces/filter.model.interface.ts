import { Document } from 'mongoose';
import IColourModel from './colour.model.interface';

export default interface IFilterModel extends Document {
  id: string;
  name: string;
  colour: IColourModel['colour'];
}
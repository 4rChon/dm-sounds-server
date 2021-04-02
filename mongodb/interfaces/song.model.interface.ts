import { Document } from 'mongoose';
import IColourModel from "./colour.model.interface";
import IFilterModel from './filter.model.interface';

export default interface ISongModel extends Document {
  id: string;
  name: string;
  loop: boolean;
  replaceAll: boolean;
  filters: Array<IFilterModel['name']>;
  thumbnail: string;
  colour: IColourModel['colour'];
}
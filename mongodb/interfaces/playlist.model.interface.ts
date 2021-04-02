import { Document } from 'mongoose';
import IColourModel from "./colour.model.interface";
import IFilterModel from './filter.model.interface';
import ISongModel from './song.model.interface';

export default interface IPlaylistModel extends Document {
  id: string;
  name: string;
  thumbnail: string;
  songs: Array<ISongModel['id']>;
  filters: Array<IFilterModel['name']>;
  colour: IColourModel['colour'];
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}
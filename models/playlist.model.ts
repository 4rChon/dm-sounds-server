import { Image, Item } from "ytpl";

export default interface PlaylistModel {
  id: string;
  title: string;
  bestThumbnail: Image;
  items: Array<Item>;
  shuffle: boolean;
  loop: boolean;
  replaceAll: boolean;
}
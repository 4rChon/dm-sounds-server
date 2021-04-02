export default interface ImportPlaylistViewModel {
  id: string;
  filters: Array<string>;
  colour: string;
  loop: boolean;
  shuffle: boolean;
  replaceAll: boolean;
}
import IPlaylist from './playlist.interface';
import ISong from './song.interface';

export default interface ICampaign {
  id: string;
  name: string;
  playlists: Array<IPlaylist['id']>;
  songs: Array<ISong['id']>;
}
import IPlaylist from "../playlists/playlist.interface";
import ISong from "../songs/song.interface";

export default interface ICampaign {
  index: string;
  name: string;
  playlists: Array<IPlaylist>;
  songs: Array<ISong>;
}
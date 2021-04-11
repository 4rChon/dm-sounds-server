import { Document, model, Schema } from "mongoose";
import { PlaylistDocument, PlaylistLean } from './playlist.model';
import { SongDocument, SongLean } from './song.model';

export interface CampaignLean {
  _id?: string;
  name: string;
  playlists: Array<PlaylistLean>;
  songs: Array<SongLean>;
}

export interface CampaignDocument extends Document {
  name: string;
  playlists: Array<PlaylistDocument['_id']>;
  songs: Array<SongDocument['_id']>;
}

export const campaignSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
});

export default model<CampaignDocument>('Campaign', campaignSchema);
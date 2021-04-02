import mongoose, { Schema } from 'mongoose';
import ICampaignModel from '../interfaces/campaign.model.interface';

export const campaignSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  name: String,
  playlists: [String],
  songs: [String],
});

export default mongoose.model<ICampaignModel>('Campaign', campaignSchema);
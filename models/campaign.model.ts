import mongoose, { Document, Schema } from 'mongoose';
import ICampaign from '../controllers/campaigns/campaign.interface';

const campaignSchema = new Schema({
  id: String,
  name: String,
  playlists: [String],
  songs: [String],
});

export default mongoose.model<ICampaign & Document>('Campaign', campaignSchema);
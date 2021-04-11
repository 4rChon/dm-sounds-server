import { CampaignModel } from "../models/campaign.interface";
import campaignModel, { CampaignLean } from "../mongodb/models/campaign.model";

export default class CampaignsService {
  public static async addCampaign(campaign: CampaignModel): Promise<CampaignLean | null> {
    return campaignModel.create(campaign);
  }

  public static async updateCampaign(campaign: CampaignModel): Promise<CampaignLean | null> {
    return campaignModel.findOneAndUpdate(
      { _id: campaign._id }, campaign, { new: true }
    ).populate({
      path: 'songs playlists',
      populate: {
        path: 'filters songs',
        populate: 'filters'
      }
    }).lean().exec();
  }

  public static async getCampaigns(): Promise<Array<CampaignLean>> {
    return campaignModel.find().populate({
      path: 'songs playlists',
      populate: {
        path: 'filters songs',
        populate: 'filters'
      }
    }).lean().exec();
  }

  public static async getCampaign(id: string): Promise<CampaignLean | null> {
    return campaignModel.findOne({ _id: id }).populate({
      path: 'songs playlists',
      populate: {
        path: 'filters songs',
        populate: 'filters'
      }
    }).lean().exec();
  }

  public static async removeCampaign(id: string): Promise<CampaignLean | null> {
    return campaignModel.findOneAndDelete({ _id: id }).lean().exec();
  }
}
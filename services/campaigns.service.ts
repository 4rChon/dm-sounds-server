import ICampaign from "../controllers/campaigns/campaign.interface";
import campaignModel from "../models/campaign.model";

export default class CampaignsService {
  public static async addCampaign(campaign: ICampaign): Promise<ICampaign | null> {
    return campaignModel.findOneAndUpdate(
      { id: campaign.id }, campaign, { upsert: true }
    ).exec();
  }

  public static async getCampaigns(): Promise<Array<ICampaign>> {
    return campaignModel.find().exec();
  }

  public static async getCampaign(id: string): Promise<ICampaign | null> {
    return campaignModel.findOne({ id }).exec();
  }

  public static async removeCampaign(id: string): Promise<ICampaign | null> {
    return campaignModel.findOneAndDelete({ id }).exec();
  }

  public static async updateCampaign(id: string, campaign: ICampaign): Promise<ICampaign | null> {
    return campaignModel.findOneAndUpdate({ id }, campaign, { new: true }).exec();
  }
}
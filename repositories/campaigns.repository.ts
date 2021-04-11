import { CampaignModel } from "../models/campaign.interface";
import CampaignsService from "../services/campaigns.service";
import CampaignNameViewModel from "../view-models/campaign-name.view-model";
import { CampaignViewModel } from "../view-models/campaign.view-model";

export default class CampaignsRepository {
  public static async addCampaign(model: CampaignModel): Promise<CampaignViewModel | null> {
    return CampaignsService.addCampaign(model);
  }

  public static async updateCampaign(model: CampaignModel): Promise<CampaignViewModel | null> {
    return CampaignsService.updateCampaign(model);
  }

  public static async getCampaigns(): Promise<Array<CampaignViewModel>> {
    return await CampaignsService.getCampaigns();
  }

  public static async getCampaignNames(): Promise<Array<CampaignNameViewModel>> {
    const campaigns = await CampaignsService.getCampaigns();

    return Promise.all(campaigns.map(async campaign => {
      return { _id: campaign._id, name: campaign.name };
    }));
  }

  public static async getCampaign(id: string): Promise<CampaignViewModel | null> {
    return CampaignsService.getCampaign(id);
  }

  public static async removeCampaign(id: string): Promise<CampaignViewModel | null> {
    return CampaignsService.removeCampaign(id);
  }
}
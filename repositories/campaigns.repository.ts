import { v4 as uuidv4 } from 'uuid';
import ICampaign from "../models/campaign.interface";
import CampaignsService from "../services/campaigns.service";
import CampaignNameViewModel from "../view-models/campaign-name.view-model";
import CampaignViewModel from "../view-models/campaign.view-model";
import PlaylistsRepository from "./playlists.repository";
import SongsRepository from "./songs.repository";

export default class CampaignsRepository {
  public static async addCampaign(model: ICampaign): Promise<ICampaign | null> {
    model.id = uuidv4();
    return CampaignsService.addCampaign(model);
  }

  public static async getCampaigns(): Promise<Array<CampaignViewModel>> {
    const campaigns = await CampaignsService.getCampaigns();

    // TODO - populate
    return Promise.all(campaigns.map(async campaign => {
      const songs = await SongsRepository.getSongsByIDs(campaign.songs);
      const playlists = await PlaylistsRepository.getPlaylistsByIDs(campaign.playlists);
      return { id: campaign.id, name: campaign.name, songs, playlists };
    }));
  }

  public static async getCampaignNames(): Promise<Array<CampaignNameViewModel>> {
    const campaigns = await CampaignsService.getCampaigns();

    return Promise.all(campaigns.map(async campaign => {
      return { id: campaign.id, name: campaign.name };
    }));
  }

  public static async getCampaign(id: string): Promise<CampaignViewModel | null> {
    const campaign = await CampaignsService.getCampaign(id);
    if (!campaign) {
      return Promise.reject('Campaign not found');
    }

    // TODO - populate
    const songs = await SongsRepository.getSongsByIDs(campaign.songs);
    const playlists = await PlaylistsRepository.getPlaylistsByIDs(campaign.playlists);
    return { id: campaign.id, name: campaign.name, songs, playlists };
  }

  public static async removeCampaign(id: string): Promise<ICampaign | null> {
    return CampaignsService.removeCampaign(id);
  }

  public static async updateCampaign(id: string, model: ICampaign): Promise<ICampaign | null> {
    return CampaignsService.updateCampaign(id, model);
  }
}
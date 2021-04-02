import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../../exceptions/database.exception';
import DuplicateCampaignException from '../../exceptions/duplicate-campaign.exception';
import ErrorHandling from '../../exceptions/handle-exception';
import HttpException from '../../exceptions/http.exception';
import CampaignsRepository from '../../repositories/campaigns.repository';
import IController from '../controller.interface';

export default class CampaignsController implements IController {
  public path = '/campaigns';
  public router = express.Router();

  constructor() {
    this.router.post(this.path, this.addCampaign);
    this.router.get(`${this.path}/get-single/:id`, this.getCampaign);
    this.router.get(this.path, this.getCampaigns);
    this.router.get(`${this.path}/get-names`, this.getCampaignNames);
    this.router.put(this.path, this.updateCampaign);
    this.router.delete(`${this.path}/:id`, this.removeCampaign);
  }

  addCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = CampaignsRepository.addCampaign(req.body);
      if (result) {
        next(new DuplicateCampaignException());
      } else {
        res.status(200).send({ message: 'Campaign added' })
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  getCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaign = await CampaignsRepository.getCampaign(req.params.id)
      if (campaign) {
        res.send(campaign);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  getCampaigns = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaigns = await CampaignsRepository.getCampaigns();
      if (campaigns !== undefined) {
        res.send(campaigns);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  getCampaignNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaigns = await CampaignsRepository.getCampaignNames();
      if (campaigns !== undefined) {
        res.send(campaigns);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  removeCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaign = CampaignsRepository.removeCampaign(req.params.id);
      if (campaign) {
        res.status(200).send({ message: 'Campaign removed!', data: campaign });
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  updateCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaign = await CampaignsRepository.updateCampaign(req.body.id, req.body);
      if (campaign) {
        res.status(200).send({ message: 'Campaign updated!', data: campaign });
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }
}

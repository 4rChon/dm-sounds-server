import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../../exceptions/database.exception';
import DuplicateCampaignException from '../../exceptions/duplicate-campaign.exception';
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

  addCampaign = (req: Request, res: Response, next: NextFunction) => {
    CampaignsRepository.addCampaign(req.body)
      .then(result => {
        if (result) {
          next(new DuplicateCampaignException());
        } else {
          res.status(200).send({ message: 'Campaign added' })
        }
      });
  }

  getCampaign = (req: Request, res: Response, next: NextFunction) => {
    CampaignsRepository.getCampaign(req.params.id).then(campaign => {
      if (campaign) {
        res.send(campaign);
      } else {
        next(new DatabaseException());
      }
    }).catch((reason) => {
      next(new HttpException(400, reason));
    });
  }

  getCampaigns = (req: Request, res: Response, next: NextFunction) => {
    CampaignsRepository.getCampaigns().then(campaigns => {
      if (campaigns !== undefined) {
        res.send(campaigns);
      } else {
        next(new DatabaseException());
      }
    });
  }

  getCampaignNames = (req: Request, res: Response, next: NextFunction) => {
    CampaignsRepository.getCampaignNames().then(campaigns => {
      if (campaigns !== undefined) {
        res.send(campaigns);
      } else {
        next(new DatabaseException());
      }
    });
  }

  removeCampaign = (req: Request, res: Response, next: NextFunction) => {
    CampaignsRepository.removeCampaign(req.params.id).then(campaign => {
      if (campaign) {
        res.status(200).send({ message: 'Campaign removed!', data: campaign });
      } else {
        next(new DatabaseException());
      }
    });
  }

  updateCampaign = (req: Request, res: Response, next: NextFunction) => {
    CampaignsRepository.updateCampaign(req.body.id, req.body).then(campaign => {
      if (campaign) {
        res.status(200).send({ message: 'Campaign updated!', data: campaign });
      } else {
        next(new DatabaseException());
      }
    });
  }
}

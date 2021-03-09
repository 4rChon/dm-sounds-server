import express, { NextFunction, Request, Response } from 'express';
import IController from '../controller.interface';

export default class PlaylistsController implements IController {
  public path = '/song';
  public router = express.Router();

  constructor() {
    this.router.post(this.path, this.addSong);
    this.router.get(this.path, this.getSongs);
    this.router.get(`${this.path}/:id`, this.getSong);
    this.router.put(this.path, this.editSong);
    this.router.delete(this.path, this.removeSong);
  }

  addSong = (req: Request, res: Response, next: NextFunction) => {

  }

  getSongs = (req: Request, res: Response, next: NextFunction) => {

  }

  getSong = (req: Request, res: Response, next: NextFunction) => {

  }

  editSong = (req: Request, res: Response, next: NextFunction) => {

  }

  removeSong = (req: Request, res: Response, next: NextFunction) => {

  }
}

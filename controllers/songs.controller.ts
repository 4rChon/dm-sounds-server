import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../exceptions/database.exception';
import ErrorHandling from '../exceptions/handle-exception';
import SongsRepository from '../repositories/songs.repository';
import IController from './controller.interface';

export default class SongsController implements IController {
  public path = '/songs';
  public router = express.Router();

  constructor() {
    this.router.post(`${this.path}/import`, this.importSong);
    this.router.get(this.path, this.getSongs);
    this.router.get(`${this.path}/get-single/:id`, this.getSong);
    this.router.put(`${this.path}`, this.updateSong);
    this.router.delete(`${this.path}/:id`, this.removeSong);
  }

  importSong = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await SongsRepository.importSong(req.body)
      res.status(200).send(result);
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  getSong = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const song = await SongsRepository.getSong(req.params.id);
      if (song) {
        res.send(song);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  getSongs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const songs = await SongsRepository.getSongs();
      if (songs) {
        res.send(songs);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  removeSong = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const song = await SongsRepository.removeSong(req.params.id);
      res.send(song);
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  updateSong = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const song = await SongsRepository.updateSong(req.body);
      if (song) {
        res.send(song);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }
}

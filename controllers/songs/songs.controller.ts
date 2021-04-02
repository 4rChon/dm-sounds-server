import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../../exceptions/database.exception';
import DuplicateSongException from '../../exceptions/duplicate-song.exception';
import ErrorHandling from '../../exceptions/handle-exception';
import SongsRepository from '../../repositories/songs.repository';
import IController from '../controller.interface';

export default class SongsController implements IController {
  public path = '/songs';
  public router = express.Router();

  constructor() {
    this.router.post(this.path, this.addSong);
    this.router.get(this.path, this.getSongs);
    this.router.get(`${this.path}/get-single/:id`, this.getSong);
    this.router.put(`${this.path}`, this.updateSong);
    this.router.delete(`${this.path}/:id`, this.removeSong);
  }

  addSong = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await SongsRepository.addSong(req.body)
      if (result) {
        next(new DuplicateSongException());
      } else {
        res.status(200).send({ message: 'Song added' });
      }
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
      const songs = SongsRepository.getSongs();
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
      if (song) {
        res.send(song);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  updateSong = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const song = await SongsRepository.updateSong(req.body.id, req.body);
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

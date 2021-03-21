import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../../exceptions/database.exception';
import DuplicateSongException from '../../exceptions/duplicate-song.exception';
import HttpException from '../../exceptions/http.exception';
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

  addSong = (req: Request, res: Response, next: NextFunction) => {
    SongsRepository.addSong(req.body)
      .then(result => {
        if (result) {
          next(new DuplicateSongException());
        } else {
          res.status(200).send({ message: 'Song added' });
        }
      }).catch(reason => {
        next(new HttpException(400, reason));
      });
  }

  getSong = (req: Request, res: Response, next: NextFunction) => {
    SongsRepository.getSong(req.params.id).then(song => {
      if (song) {
        res.send(song);
      } else {
        next(new DatabaseException());
      }
    });
  }

  getSongs = (req: Request, res: Response, next: NextFunction) => {
    SongsRepository.getSongs().then(songs => {
      if (songs) {
        res.send(songs);
      } else {
        next(new DatabaseException());
      }
    });
  }

  removeSong = (req: Request, res: Response, next: NextFunction) => {
    SongsRepository.removeSong(req.params.id).then(song => {
      if (song) {
        res.send(song);
      } else {
        next(new DatabaseException());
      }
    });
  }

  updateSong = (req: Request, res: Response, next: NextFunction) => {
    SongsRepository.updateSong(req.body.id, req.body).then(song => {
      if (song) {
        res.send(song);
      } else {
        next(new DatabaseException());
      }
    }).catch(reason => {
      next(new HttpException(400, reason));
    });
  }
}

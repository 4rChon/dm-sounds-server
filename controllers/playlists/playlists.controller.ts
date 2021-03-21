import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../../exceptions/database.exception';
import DuplicatePlaylistException from '../../exceptions/duplicate-playlist.exception';
import HttpException from '../../exceptions/http.exception';
import PlaylistsRepository from '../../repositories/playlists.repository';
import IController from '../controller.interface';

export default class PlaylistsController implements IController {
  public path = '/playlists';
  public router = express.Router();

  constructor() {
    this.router.post(this.path, this.addPlaylist);
    this.router.post(`${this.path}/import`, this.importPlaylist);
    this.router.get(this.path, this.getPlaylists);
    this.router.get(`${this.path}/get-single/:id`, this.getPlaylist);
    this.router.put(this.path, this.updatePlaylist);
    this.router.delete(`${this.path}/:id`, this.removePlaylist);
  }

  addPlaylist = (req: Request, res: Response, next: NextFunction) => {
    PlaylistsRepository.addPlaylist(req.body)
      .then(result => {
        if (result) {
          next(new DuplicatePlaylistException());
        } else {
          res.status(200).send({ message: 'Playlist added' })
        }
      })
      .catch((reason: string) => next(new HttpException(400, reason)));
  };

  importPlaylist = (req: Request, res: Response, next: NextFunction) => {
    PlaylistsRepository.importPlaylist(req.body.id)
      .then(result => {
        if (result) {
          next(new DuplicatePlaylistException());
        } else {
          res.status(200).send({ message: 'Playlist added' })
        }
      })
      .catch((reason: string) => next(new HttpException(400, reason)));
  }

  getPlaylists = (req: Request, res: Response, next: NextFunction) => {
    PlaylistsRepository.getPlaylists()
      .then(playlists => {
        if (playlists) {
          res.send(playlists)
        } else {
          next(new DatabaseException());
        }
      });
  };

  getPlaylist = (req: Request, res: Response, next: NextFunction) => {
    PlaylistsRepository.getPlaylist(req.params.id)
      .then(playlist => {
        if (playlist) {
          res.send(playlist);
        } else {
          next(new DatabaseException());
        }
      }).catch((reason: string) => new HttpException(400, reason));
  }

  updatePlaylist = (req: Request, res: Response, next: NextFunction) => {
    PlaylistsRepository.updatePlaylist(req.body.id, req.body).then(playlist => {
      if (playlist) {
        res.send(playlist);
      } else {
        next(new DatabaseException());
      }
    }).catch(reason => {
      next(new HttpException(400, reason));
    });
  }

  removePlaylist = (req: Request, res: Response, next: NextFunction) => {
    PlaylistsRepository.removePlaylist(req.params.id).then(playlist => {
      if (playlist) {
        res.send(playlist);
      } else {
        next(new DatabaseException());
      }
    });
  }
}

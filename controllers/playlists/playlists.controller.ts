import express, { Request, Response, NextFunction } from 'express';
import DatabaseException from '../../exceptions/database-exception';
import InvalidPlaylistIdException from '../../exceptions/invalid-playlist-id.exception';
import PlaylistRepository from '../../repositories/playlist.repository';
import YTPLService from '../../services/ytpl.service';
import Controller from '../controller.interface';

export default class PlaylistsController implements Controller {
  public path = '/playlists';
  public router = express.Router();

  constructor() {
    this.router.post(this.path, this.addPlaylist);
    this.router.get(this.path, this.getPlaylists);
  }

  addPlaylist = (req: Request, res: Response, next: NextFunction) => {
    PlaylistRepository.addPlaylist(req.body)
      .then(result => {
        if (result) {
          res.sendStatus(200)
        } else {
          next(new DatabaseException());
        }
      })
      .catch(() => next(new InvalidPlaylistIdException()));
  };

  getPlaylists = (req: Request, res: Response, next: NextFunction) => {
    PlaylistRepository.getPlaylists()
      .then(playlists => {
        if (playlists) {
          res.send(playlists)
        } else {
          next(new DatabaseException());
        }
      });
  };
}

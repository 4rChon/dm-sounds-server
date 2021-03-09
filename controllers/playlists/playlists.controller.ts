import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../../exceptions/database.exception';
import DuplicatePlaylistException from '../../exceptions/duplicate-playlist.exception';
import InvalidPlaylistIdException from '../../exceptions/invalid-playlist-id.exception';
import PlaylistRepository from '../../repositories/playlist.repository';
import IController from '../controller.interface';

export default class PlaylistsController implements IController {
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
          next(new DuplicatePlaylistException());
        } else {
          res.status(200).send({ message: 'Playlist added' })
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

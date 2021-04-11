import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../../exceptions/database.exception';
import DuplicatePlaylistException from '../../exceptions/duplicate-playlist.exception';
import ErrorHandling from '../../exceptions/handle-exception';
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

  addPlaylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await PlaylistsRepository.addPlaylist(req.body);
      if (result) {
        next(new DuplicatePlaylistException());
      } else {
        res.status(200).send({ message: 'Playlist added' })
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  };

  importPlaylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await PlaylistsRepository.importPlaylist(req.body);
      if (result) {
        next(new DuplicatePlaylistException());
      } else {
        res.status(200).send({ message: 'Playlist added' })
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  getPlaylists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playlists = await PlaylistsRepository.getPlaylists();
      if (playlists) {
        res.send(playlists)
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  };

  getPlaylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playlist = await PlaylistsRepository.getPlaylist(req.params.id);
      if (playlist) {
        res.send(playlist);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  updatePlaylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playlist = await PlaylistsRepository.updatePlaylist(req.body);
      if (playlist) {
        res.send(playlist);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  removePlaylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playlist = await PlaylistsRepository.removePlaylist(req.params.id);
      if (playlist) {
        res.send(playlist);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }
}

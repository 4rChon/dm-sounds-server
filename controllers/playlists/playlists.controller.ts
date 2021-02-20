import express, { Request, Response, NextFunction } from 'express';
import InvalidPlaylistIdException from '../../exceptions/invalid-playlist-id.exception';
import playlistRepository from '../../repositories/playlist.repository';

class PlaylistsController {
  public path = '/playlists';
  public router = express.Router();

  constructor() {
    this.router.post(this.path, this.addPlaylist);
    this.router.get(this.path, this.getPlaylists);
  }

  addPlaylist = (req: Request, res: Response, next: NextFunction) => {
    playlistRepository.addPlaylist(req.body)
      .then(
        () => res.sendStatus(50)
      ).catch(
        () => next(new InvalidPlaylistIdException())
      );
  };

  getPlaylists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(await playlistRepository.getPlaylists());
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };
}

export default PlaylistsController;
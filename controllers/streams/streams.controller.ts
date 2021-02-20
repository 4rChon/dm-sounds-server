import express, { Request, Response, NextFunction } from 'express';
import playlistRepository from '../../repositories/playlist.repository';

class StreamsController {
  public path = '/streams';
  public router = express.Router();

  constructor() {
    this.router.get(`${this.path}/:url`, this.streamUrl);
  }

  streamUrl = (req: Request, res: Response, next: NextFunction) => {
    try {
      playlistRepository.getAudioStream(`https://www.youtube.com/watch?v=${req.params.url}`).pipe(res);
    } catch (err) {
      res.status(500).send(err).end();
    }
  };
}

export default StreamsController;
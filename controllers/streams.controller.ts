import express, { Request, Response, NextFunction } from 'express';
import StreamUrlException from '../../exceptions/stream-url.exception';
import PlaylistsRepository from '../../repositories/playlists.repository';
import IController from '../controller.interface';

export default class StreamsController implements IController {
  public path = '/streams';
  public router = express.Router();

  constructor() {
    this.router.get(`${this.path}/:url`, this.streamUrl);
  }

  streamUrl = (req: Request, res: Response, next: NextFunction) => {
    try {
      PlaylistsRepository.getAudioStream(`https://www.youtube.com/watch?v=${req.params.url}`).pipe(res);
    } catch (err) {
      next(new StreamUrlException());
    }
  };
}

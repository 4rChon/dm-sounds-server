import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import HttpException from './exceptions/http.exception';
import playlistRepository from './repositories/playlist.repository';

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.path}`);
  next();
}

function errorHandlingMiddleware(err: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).send({ status, message });
}

class App {
  public app: Application;

  constructor(controllers: Array<any>, public readonly port: number) {
    this.app = express();

    // init middlewares
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(loggerMiddleware);

    // init controllers
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });

    this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send('Hello world!');
    });

    // init error handling middleware
    this.app.use(errorHandlingMiddleware);
  }

  public listen(): Server {
    return this.app.listen(this.port, () => {
      console.log(`[server]: Server is running on port ${this.port}`);
    });
  };

  public async dispose(): Promise<void> {
    await playlistRepository.dispose();
  }
}

export default App;
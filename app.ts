import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import mongoose, { Connection } from 'mongoose';
import HttpException from './exceptions/http.exception';

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

  private db: Connection;

  constructor(controllers: Array<any>, public readonly port: number) {
    this.app = express();

    // init middlewares
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(loggerMiddleware);

    // init db
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1esps.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: false,
    });

    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, '[database]: Database connection error:'));
    this.db.once('once', () => {
      console.log('[database]: Database connected!');
    });

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
    await this.db.close();
  }
}

export default App;
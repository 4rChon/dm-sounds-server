import express, { NextFunction, Request, Response } from 'express';
import ErrorHandling from '../exceptions/handle-exception';
import IController from './controller.interface';
import request from 'request';

export default class AuthController implements IController {
  public path = '/auth';
  public router = express.Router();

  private spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  private spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  private accessToken = '';

  constructor() {
    this.router.get(`${this.path}/spotify/login`, this.spotifyLogin);
    this.router.get(`${this.path}/spotify/callback`, this.spotifyCallback);
    this.router.get(`${this.path}/spotify/token`, this.spotifyToken);
  }

  spotifyLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scope = 'streaming \
                     user-read-email \
                     user-read-private';

      const state = this.generateRandomString(16);

      const authQueryParameters = {
        response_type: 'code',
        client_id: this.spotifyClientId,
        scope: scope,
        redirect_uri: 'http://localhost:4200/auth/spotify/callback',
        state: state
      };

      res.redirect(`https://accounts.spotify.com/authorize/?${authQueryParameters}`);

    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  spotifyCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = req.query.code;

      const authToken = Buffer.from(`${this.spotifyClientId}:${this.spotifyClientSecret}`, 'base64');

      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: "http://localhost:4200/auth/callback",
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
      };

      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          res.redirect('/');
        }
      })
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  spotifyToken = async (req: Request, res: Response, next: NextFunction) => {
    res.json({ access_token: this.accessToken })
  }

  generateRandomString = (length: number) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}

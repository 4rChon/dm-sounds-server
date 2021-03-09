import HttpException from './http.exception';

export default class DuplicateSongException extends HttpException {
  constructor() {
    super(400, 'Song already added');
  }
}

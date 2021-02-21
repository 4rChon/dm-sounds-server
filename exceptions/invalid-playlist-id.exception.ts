import HttpException from './http.exception';

export default class InvalidPlaylistIdException extends HttpException {
  constructor() {
    super(400, 'Invalid playlist ID');
  }
}

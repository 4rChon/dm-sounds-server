import HttpException from './http.exception';

class InvalidPlaylistIdException extends HttpException {
  constructor() {
    super(400, 'Invalid Playlist ID');
  }
}

export default InvalidPlaylistIdException;
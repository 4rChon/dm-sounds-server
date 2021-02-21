import HttpException from './http.exception';

export default class DuplicatePlaylistException extends HttpException {
  constructor() {
    super(400, 'Playlist already added');
  }
}

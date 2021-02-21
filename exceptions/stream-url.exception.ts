import HttpException from './http.exception';

export default class StreamUrlException extends HttpException {
  constructor() {
    super(500, 'Error streaming content');
  }
}

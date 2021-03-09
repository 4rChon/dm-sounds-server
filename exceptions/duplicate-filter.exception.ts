import HttpException from './http.exception';

export default class DuplicateFilterException extends HttpException {
  constructor() {
    super(400, 'Filter already added');
  }
}

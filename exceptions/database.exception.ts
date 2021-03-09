import HttpException from './http.exception';

export default class DatabaseException extends HttpException {
  constructor() {
    super(500, 'Database error');
  }
}

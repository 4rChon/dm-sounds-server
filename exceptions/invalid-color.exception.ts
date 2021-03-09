import HttpException from './http.exception';

export default class InvalidColourException extends HttpException {
  constructor() {
    super(400, 'Colour values not within the range [0-1]');
  }
}

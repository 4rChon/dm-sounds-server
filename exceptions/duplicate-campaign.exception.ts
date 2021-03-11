import HttpException from './http.exception';

export default class DuplicateCampaignException extends HttpException {
  constructor() {
    super(400, 'Campaign already added');
  }
}

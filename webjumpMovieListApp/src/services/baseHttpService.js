import axios from 'axios';
export default class BaseHttpService {
  constructor() {
    this.header = {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': 2,
        'trakt-api-key':
          'c7c84f83dfddcfdf9ba661d7600a538a66681b19d811f23331b13870e5829c1e',
        api_key: '96c13e60658078293b1c011827aaa291',
      },
    };
  }
  get = url => axios.get(url, this.header);
}

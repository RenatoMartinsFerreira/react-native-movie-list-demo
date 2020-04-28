import axios from 'axios';
import Config from 'react-native-config';

export default class BaseHttpService {
  constructor() {
    this.header = {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': 2,
        'trakt-api-key': Config.TRAKT_API_KEY,
      },
    };
  }
  get = url => axios.get(url, this.header);
}

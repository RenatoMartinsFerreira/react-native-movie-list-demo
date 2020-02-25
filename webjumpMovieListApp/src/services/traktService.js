import BaseHttpService from './baseHttpService';

export default class TraktService extends BaseHttpService {
  constructor(props) {
    super(props);
  }

  trendingList = offset =>
    // this.get('https://private-ca0de0-trakt.apiary-mock.com/movies/trending');
    this.get(`https://api.trakt.tv/movies/trending?limit=10&page=${offset}`);
}

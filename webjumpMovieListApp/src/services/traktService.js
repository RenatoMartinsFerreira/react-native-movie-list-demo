import BaseHttpService from './baseHttpService';

export default class TraktService extends BaseHttpService {
  constructor(props) {
    super(props);
  }

  trendingList = () =>
    this.get('https://private-ca0de0-trakt.apiary-mock.com/movies/trending');
}

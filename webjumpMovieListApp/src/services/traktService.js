import BaseHttpService from './baseHttpService';

export default class TraktService extends BaseHttpService {
  constructor(props) {
    super(props);
  }

  trendingList = offset =>
    // this.get('https://private-ca0de0-trakt.apiary-mock.com/movies/trending');
    this.get(`https://api.trakt.tv/movies/trending?limit=10&page=${offset}`);

  searchList = (searchText, offset = 1) =>
    // this.get(`https://private-anon-cd07abca51-trakt.apiary-mock.com/movie?limit=3&query=${searchText}&page=${offset}` );
    this.get(
      `https://api.trakt.tv/search/movie?limit=3&query=${searchText}&page=${offset}`,
    );
}

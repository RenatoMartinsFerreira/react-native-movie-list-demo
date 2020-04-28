import BaseHttpService from './baseHttpService';
import Config from 'react-native-config';

export default class TmdbService extends BaseHttpService {
  constructor(props) {
    super(props);
  }

  movieData = tmdbId =>
    this.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${Config.TMDB_API_KEY}`,
      this.header,
    );

  movieimage = posterPath =>
    this.get(`https://image.tmdb.org/t/p/w500/${posterPath}`, this.header);
}

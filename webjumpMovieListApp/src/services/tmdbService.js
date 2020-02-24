import BaseHttpService from './baseHttpService';

export default class TmdbService extends BaseHttpService {
  constructor(props) {
    super(props);
  }

  movieData = tmdbId =>
    this.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=96c13e60658078293b1c011827aaa291`,
      this.header,
    );

  movieimage = posterPath =>
    this.get(`https://image.tmdb.org/t/p/w500/${posterPath}`, this.header);
}

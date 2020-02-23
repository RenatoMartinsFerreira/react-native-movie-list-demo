import TraktService from 'webjumpMovieListApp/src/services/traktService';
import TmdbService from 'webjumpMovieListApp/src/services/tmdbService';

export default class MovieModel {
  constructor(movieModel) {
    (this.watchers = movieModel.watchers || 0),
      (this.title = movieModel.title || ''),
      (this.year = movieModel.year || 0),
      (this.trakt = movieModel.trakt || 0),
      (this.slug = movieModel.slug || ''),
      (this.imdb = movieModel.imdb || ''),
      (this.tmdb = movieModel.tmdb || 0);

    this.tmdbService = new TmdbService();
    this.traktService = new TraktService();
  }
}

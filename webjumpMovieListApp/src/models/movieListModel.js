import Store from 'webjumpMovieListApp/src/redux/store';
import TraktService from 'webjumpMovieListApp/src/services/traktService';
import TmdbService from 'webjumpMovieListApp/src/services/tmdbService';

export default class MovieListModel {
  static getMovieListDS = () => {};

  static saveMovieList = (movieListData, saveOnDS = true) => {};

  constructor(movies = []) {
    const movieListData = Store.getState().movieListReducer;
    this.movies = movies || movieListData.movies;

    this.tmdbService = new TmdbService();
    this.traktService = new TraktService();
  }
}

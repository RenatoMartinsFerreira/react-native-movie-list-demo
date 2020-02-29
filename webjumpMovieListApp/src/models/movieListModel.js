import Store from 'webjumpMovieListApp/src/redux/store';
import TraktService from 'webjumpMovieListApp/src/services/traktService';
import TmdbService from 'webjumpMovieListApp/src/services/tmdbService';

const TYPE = [
  {
    TRENDING: 'TRENDING',
    MYMOVIES: 'MYMOVIES',
    DEFALT: 'DEFALT',
  },
];
export default class MovieListModel {
  static getMovieListDS = () => {};

  static saveMovieList = (movieListData, saveOnDS = true) => {};

  constructor(type = MovieListModel.TYPE.DEFALT, movies = [], offset = 1) {
    const movieListData = Store.getState().movieListReducer;
    this.movies = movies || movieListData.movies;
    this.type = type;
    this.offset = offset;
    this.tmdbService = new TmdbService();
    this.traktService = new TraktService();
  }
  setMovies = offset => {
    return new Promise((resolve, reject) => {
      this.traktService
        .trendingList(offset)
        .then(response => {
          const newMovieListModel = new MovieListModel(
            this.type,
            response.data,
            offset,
          );
          this.getTmdbData(newMovieListModel)
            .then(res => resolve(res))
            .catch(e => reject(e));
        })
        .catch(e => reject(e));
    });
  };

  getTmdbData = movieListModel => {
    return new Promise((resolve, reject) => {
      for (const key in movieListModel.movies) {
        if (movieListModel.movies.hasOwnProperty(key)) {
          const element = movieListModel.movies[key];
          this.tmdbService
            .movieData(
              element.movie.ids.tmdb
                ? element.movie.ids.tmdb
                : element.movie.ids.imdb,
            )
            .then(tmdbData => {
              movieListModel.movies[key].movie.uri = tmdbData.data.poster_path;
              movieListModel.movies[key].movie.description =
                tmdbData.data.overview;
              movieListModel.movies[key].movie.link = tmdbData.data.homepage;
              movieListModel.movies.length - 1 == key &&
                resolve(new MovieListModel(this.type, movieListModel.movies));
            })
            .catch(e => reject(e));
        }
      }
    });
  };

  searchMovieList = searchText => {
    return new Promise((resolve, reject) => {
      this.traktService
        .searchList(searchText)
        .then(response => {
          const newMovieListModel = new MovieListModel(
            this.type,
            response.data,
            1,
          );
          this.getTmdbData(newMovieListModel).then(richMovieDetail => {
            resolve(richMovieDetail.movies);
          });
        })
        .catch(e => reject(e));
    });
  };

  nextPageMovies = () => {
    return new Promise((resolve, reject) => {
      this.offset = this.offset + 1;
      this.setMovies(this.offset).then(newMovies => {
        resolve(newMovies);
      });
    });
  };
}

MovieListModel.TYPE = TYPE;

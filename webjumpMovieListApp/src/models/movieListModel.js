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
      this.traktService.trendingList(offset).then(response => {
        // resolve(new MovieListModel(this.type, response.data[0].movies)),
        const newMovieListModel = new MovieListModel(
          this.type,
          response.data,
          offset,
        );
        for (const key in newMovieListModel.movies) {
          if (newMovieListModel.movies.hasOwnProperty(key)) {
            const element = newMovieListModel.movies[key];
            this.tmdbService
              .movieData(element.movie.ids.tmdb)
              .then(tmdbData => {
                newMovieListModel.movies[key].movie.uri =
                  tmdbData.data.poster_path;
                newMovieListModel.movies[key].movie.description =
                  tmdbData.data.overview;
                newMovieListModel.movies[key].movie.link =
                  tmdbData.data.homepage;

                newMovieListModel.movies.length - 1 == key &&
                  resolve(
                    new MovieListModel(this.type, newMovieListModel.movies),
                  );
              });
          }
        }
      });
    });
  };

  nextPageMovies = () => {
    return new Promise((resolve, reject) => {
      this.offset = this.offset + 1;
      this.setMovies(this.offset).then(newMovies => {
        console.log('newMovies', newMovies);
        resolve(newMovies);
      });
    });
  };
}

MovieListModel.TYPE = TYPE;

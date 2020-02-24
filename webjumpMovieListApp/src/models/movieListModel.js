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

  constructor(type = MovieListModel.TYPE.DEFALT, movies = []) {
    const movieListData = Store.getState().movieListReducer;
    this.movies = movies || movieListData.movies;
    this.type = type;
    this.tmdbService = new TmdbService();
    this.traktService = new TraktService();
  }
  setMovies = () => {
    return new Promise((resolve, reject) => {
      this.traktService.trendingList().then(response => {
        console.log('log', response.data);
        // resolve(new MovieListModel(this.type, response.data[0].movies)),
        const newMovieListModel = new MovieListModel(this.type, response.data);

        console.log('newMovieListModel', newMovieListModel.movies);

        for (const key in newMovieListModel.movies) {
          if (newMovieListModel.movies.hasOwnProperty(key)) {
            const element = newMovieListModel.movies[key];

            console.log('element', element.movie.ids.tmdb);

            this.tmdbService
              .movieData(element.movie.ids.tmdb)
              .then(tmdbData => {
                console.log('fuck', newMovieListModel.movies);
                newMovieListModel.movies[key].movie.uri = tmdbData.data.poster_path;
                newMovieListModel.movies.length - 1 == key
                  ? resolve(
                      new MovieListModel(this.type, newMovieListModel.movies),
                    )
                  : console.log('teste', newMovieListModel);
              });
          }
        }
      });
    });
  };
}

MovieListModel.TYPE = TYPE;

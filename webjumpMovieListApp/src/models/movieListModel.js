import TraktService from 'webjumpMovieListApp/src/services/traktService';
import TmdbService from 'webjumpMovieListApp/src/services/tmdbService';
import Store from 'webjumpMovieListApp/src/redux/store';
import {saveMovieList} from 'webjumpMovieListApp/src/redux/actions';

import MovieModel from 'webjumpMovieListApp/src/models/movieModel';

export default class MovieListModel {
  constructor(movies = [], offset = 1) {
    const movieListData = Store.getState().movieListReducer;
    this.movies = movies || movieListData.movies;
    this.offset = offset;
    this.tmdbService = new TmdbService();
    this.traktService = new TraktService();
  }
  setMovies = offset => {
    return new Promise((resolve, reject) => {
      this.traktService
        .trendingList(offset)
        .then(response => {
          const newMovieListModel = new MovieListModel(response.data, offset);
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
                resolve(new MovieListModel(movieListModel.movies));
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
          const newMovieListModel = new MovieListModel(response.data, 1);
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

  onFavoriteClick = (movieModel = new MovieModel()) => {
    const storeArray = Store.getState().movieListReducer;
    const indexProps = storeArray.movieList.findIndex(
      i => i.ids.tmdb === movieModel.ids.tmdb,
    );
    if (indexProps === -1) {
      storeArray.movieList.push(movieModel);
      Store.dispatch(saveMovieList(storeArray));
    } else {
      storeArray.movieList.splice(indexProps, 1);
      Store.dispatch(saveMovieList(storeArray));
    }
  };

  isFavorite = (movieModel = new MovieModel()) => {
    const storeArray = Store.getState().movieListReducer;
    const indexProps = storeArray.movieList.findIndex(
      i => i.ids.tmdb === movieModel.ids.tmdb,
    );
    return indexProps > -1;
  };
}

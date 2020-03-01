export default class MovieModel {
  constructor(movieModel = {}) {
    this.watchers = movieModel.watchers || 0;
    this.title = movieModel.title || '';
    this.year = movieModel.year || 0;
    this.description = movieModel.description || '';
    this.uri = movieModel.uri || '';
    this.ids = movieModel.ids || {
      trakt: movieModel.trakt || 0,
      slug: movieModel.slug || '',
      imdb: movieModel.imdb || '',
      tmdb: movieModel.tmdb || 0,
    };
  }
}

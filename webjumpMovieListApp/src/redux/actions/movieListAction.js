import {MOVIE_LIST_SAVE_MODEL} from './actionTypes';

export const saveMovieList = payload => ({
  type: MOVIE_LIST_SAVE_MODEL,
  payload,
});

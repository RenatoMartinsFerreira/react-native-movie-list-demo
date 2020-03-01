import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  movieList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.MOVIE_LIST_SAVE_MODEL:
      return action.payload;
    default:
      return {...state};
  }
};

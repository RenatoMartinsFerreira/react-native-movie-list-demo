import {combineReducers} from 'redux';
import MovieListReducer from './movieListReducer';

export default combineReducers({
  movieListReducer: MovieListReducer,
});

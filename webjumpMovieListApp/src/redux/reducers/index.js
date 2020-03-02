import {combineReducers} from 'redux';
import MovieListReducer from './movieListReducer';

const rootReducer = combineReducers({
  movieListReducer: MovieListReducer,
});

export default rootReducer;

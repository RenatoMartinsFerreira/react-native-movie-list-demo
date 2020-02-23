import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import Reducers from '../reducers';

export default createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(promise)),
);

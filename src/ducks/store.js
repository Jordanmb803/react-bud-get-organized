import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index';
import promiseMiddleWare from 'redux-promise-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(promiseMiddleWare)
))

export default store;
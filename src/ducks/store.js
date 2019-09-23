import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import reducer from './user';
import promiseMiddleWare from 'redux-promise-middleware';

const store = createStore(reducer, applyMiddleware(promiseMiddleWare))

export default store;
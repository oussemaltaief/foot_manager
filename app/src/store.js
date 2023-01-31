import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';
import client from './utils/client';
import { initApp } from './modules/app/app.ducks';

const isDev = process.env.NODE_ENV !== 'production';

const middleware = applyMiddleware(
  thunk.withExtraArgument(client),
  promiseMiddleware()
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  isDev ? composeEnhancers(middleware) : middleware
);

store.dispatch(initApp());

export default store;

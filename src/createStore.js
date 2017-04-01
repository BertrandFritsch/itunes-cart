// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import cart from './contexts/cart';

const nodeProcess = typeof process !== 'undefined' && process;
const isTestEnv = nodeProcess && nodeProcess.env.NODE_ENV === 'test';

const sagaMiddleware = createSagaMiddleware();

/**
 * redux middleware -- only the saga middleware used here
 */
const middleware = [sagaMiddleware];

/**
 * Wrap the createStore function to be able to use the REDUX DEVTOOLS in development mode
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const finalCreateStore = !isTestEnv ? composeEnhancers(
  applyMiddleware(...middleware)
)(createStore) : createStore;

/**
 * Create the redux store
 */
const store = finalCreateStore(combineReducers({ cart: cart.reducers }));

/**
 * Start the sagas
 */
if (!isTestEnv) {
  sagaMiddleware.run(cart.sagas);
}

export default store;

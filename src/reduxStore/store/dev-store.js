/* eslint object-shorthand: 0, import/first: 0 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../../utils/utils.redux.rootReducer';

// small middleware to set window variable with result of state for debugging
const setWindowState = store => next => (action) => {
  const result = next(action);

  if (!window.stateObject) window.stateObject = {};
  window.stateObject = Object.assign({}, window.stateObject, store.getState());

  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
    setWindowState,
  ),
)(createStore);

/**
 * Creates a preconfigured store.
 */
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../../utils/utils.redux.rootReducer', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../../utils/utils.redux.rootReducer').default);
    });
  }

  return store;
}

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

// Actions
import homeActions from '../redux/home/home.redux.initData';

// State
import homeState from '../redux/home/home.initialState';

const initialState = {
  isInitialized: false,
  home: homeState,
};

function handleActionsExt(actions) {
  const handlers = Object
    .keys(actions)
    .reduce((result, key) => {
      if (actions[key].type !== key) {
        // eslint-disable-next-line no-console
        console.error(`Constant ${key} should match type ${actions[key].type}. reducer won't be called.`);
      }
      result[key] = actions[key].reducer;
      return result;
    }, {});

  return handlers;
}

const appActions = handleActions(
  {
    ...handleActionsExt(homeActions),
  },
  initialState,
);

const rootReducer = combineReducers({
  appData: appActions,
});

export default rootReducer;

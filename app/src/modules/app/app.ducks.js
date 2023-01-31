import { combineReducers } from 'redux';

import { login, logout } from '../auth/auth.ducks';

const APP_INIT_PENDING = 'APP_INIT_PENDING';
const APP_INIT_REJECTED = 'APP_INIT_REJECTED';
const APP_INIT_FULFILLED = 'APP_INIT_FULFILLED';

const initialized = (state = false, { type }) => {
  switch (type) {
    case APP_INIT_PENDING:
      return false;

    case APP_INIT_REJECTED:
    case APP_INIT_FULFILLED:
      return true;

    default:
      return state;
  }
};

const error = (state = null, { type, payload }) => {
  switch (type) {
    case APP_INIT_PENDING:
    case APP_INIT_FULFILLED:
      return null;

    case APP_INIT_REJECTED:
      return payload;

    default:
      return state;
  }
};

// `app` reducer
export default combineReducers({ initialized, error });

// ################## `app` module actions ##################
export const initApp = () => async dispatch => {
  dispatch({
    type: APP_INIT_PENDING
  });

  try {
    await dispatch(login(undefined, true));
  } catch (err) {
    if (err.code === 401) {
      dispatch(logout());
    } else {
      dispatch({
        type: APP_INIT_REJECTED,
        payload: err
      });

      return;
    }
  }

  dispatch({ type: APP_INIT_FULFILLED });
};

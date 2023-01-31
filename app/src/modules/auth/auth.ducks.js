import { combineReducers } from 'redux';

import client from '../../utils/client';

const LOG_IN_PENDING = 'LOG_IN_PENDING';
const LOG_IN_REJECTED = 'LOG_IN_REJECTED';
const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED';
export const LOG_OUT_FULFILLED = 'LOG_OUT_FULFILLED';

const loading = (state = false, { type }) => {
  switch (type) {
    case LOG_IN_PENDING:
      return true;
    case LOG_IN_REJECTED:
    case LOG_IN_FULFILLED:
      return false;
    default:
      return state;
  }
};

const error = (state = null, { type, payload, meta }) => {
  switch (type) {
    case LOG_IN_PENDING:
    case LOG_IN_FULFILLED:
    case LOG_OUT_FULFILLED:
      return null;
    case LOG_IN_REJECTED:
      return meta.silent ? null : payload;
    default:
      return state;
  }
};

const user = (state = null, { type, payload }) => {
  switch (type) {
    case LOG_IN_FULFILLED:
      return payload;
    case LOG_IN_PENDING:
    case LOG_IN_REJECTED:
    case LOG_OUT_FULFILLED:
      return null;
    default:
      return state;
  }
};

// `auth` reducer
export default combineReducers({ loading, error, user });

// ################## `auth` module actions ##################

/**
 * `Silent` (second parameter) is an optional boolean
 * that will disable the insertion of error object into
 * the store if is set to 'true' (e.g. on App init login)
 */
export const login = (credentials, silent = false) => ({
  type: 'LOG_IN',
  payload: client
    .authenticate(credentials)
    .then(response => client.passport.verifyJWT(response.accessToken))
    .then(payload => client.service('users').get(payload.userId))
    .then(user => {
      client.set('user', user);
      return user;
    }),
  meta: { silent }
});

export const logout = () => ({
  type: 'LOG_OUT',
  payload: client.logout()
});

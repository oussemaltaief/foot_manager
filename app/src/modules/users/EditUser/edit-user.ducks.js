import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_USER_PENDING = 'REQUEST_USER_PENDING';
export const REQUEST_USER_REJECTED = 'REQUEST_USER_REJECTED';
export const REQUEST_USER_FULFILLED = 'REQUEST_USER_FULFILLED';
export const UPDATE_USER_PENDING = 'UPDATE_USER_PENDING';
export const UPDATE_USER_REJECTED = 'UPDATE_USER_REJECTED';
export const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_USER_PENDING:
    case UPDATE_USER_PENDING:
      return true;
    case REQUEST_USER_REJECTED:
    case UPDATE_USER_REJECTED:
    case REQUEST_USER_FULFILLED:
    case UPDATE_USER_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const fetchUser = id => {
  return (dispatch, getState) => {
    const user = getState().users.byId[id];

    return dispatch({
      type: 'REQUEST_USER',
      payload: user ? Promise.resolve(user) : client.service('users').get(id)
    });
  };
};

export const updateUser = (id, data) => {
  return {
    type: 'UPDATE_USER',
    payload: client.service('users').update(id, data)
  };
};

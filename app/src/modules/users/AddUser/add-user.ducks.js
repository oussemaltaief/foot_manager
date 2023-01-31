import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_USER_PENDING = 'ADD_USER_PENDING';
export const ADD_USER_REJECTED = 'ADD_USER_REJECTED';
export const ADD_USER_FULFILLED = 'ADD_USER_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_USER_PENDING:
      return true;
    case ADD_USER_REJECTED:
    case ADD_USER_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addUser = data => {
  return {
    type: 'ADD_USER',
    payload: client.service('users').create(data)
  };
};

import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_ROLES_PENDING = 'ADD_ROLES_PENDING';
export const ADD_ROLES_REJECTED = 'ADD_ROLES_REJECTED';
export const ADD_ROLES_FULFILLED = 'ADD_ROLES_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_ROLES_PENDING:
      return true;
    case ADD_ROLES_REJECTED:
    case ADD_ROLES_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addRole = data => {
  return {
    type: 'ADD_ROLES',
    payload: client.service('roles').create(data)
  };
};

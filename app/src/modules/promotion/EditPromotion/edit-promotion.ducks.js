import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_ROLE_PENDING = 'REQUEST_ROLE_PENDING';
export const REQUEST_ROLE_REJECTED = 'REQUEST_ROLE_REJECTED';
export const REQUEST_ROLE_FULFILLED = 'REQUEST_ROLE_FULFILLED';
export const UPDATE_ROLE_PENDING = 'UPDATE_ROLE_PENDING';
export const UPDATE_ROLE_REJECTED = 'UPDATE_ROLE_REJECTED';
export const UPDATE_ROLE_FULFILLED = 'UPDATE_ROLE_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_ROLE_PENDING:
    case UPDATE_ROLE_PENDING:
      return true;
    case REQUEST_ROLE_REJECTED:
    case UPDATE_ROLE_REJECTED:
    case REQUEST_ROLE_FULFILLED:
    case UPDATE_ROLE_FULFILLED:
      return false;
    default:
      return state;
  }
};

// Action Creators

export const fetchRole = id => {
  return (dispatch, getState) => {
    const roles = getState().roles.byId[id];

    return dispatch({
      type: 'REQUEST_ROLE',
      payload: roles ? Promise.resolve(roles) : client.service('roles').get(id)
    });
  };
};

export const updateRole = (id, data) => {
  return {
    type: 'UPDATE_ROLE',
    payload: client.service('roles').update(id, data)
  };
};

export default combineReducers({ loading });

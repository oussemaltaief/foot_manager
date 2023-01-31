import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_LAND_PENDING = 'ADD_LAND_PENDING';
export const ADD_LAND_REJECTED = 'ADD_LAND_REJECTED';
export const ADD_LAND_FULFILLED = 'ADD_LAND_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_LAND_PENDING:
      return true;
    case ADD_LAND_REJECTED:
    case ADD_LAND_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addLand = data => {
  return {
    type: 'ADD_LAND',
    payload: client.service('lands').create(data)
  };
};

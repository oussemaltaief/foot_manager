import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_ZONE_PENDING = 'ADD_ZONE_PENDING';
export const ADD_ZONE_REJECTED = 'ADD_ZONE_REJECTED';
export const ADD_ZONE_FULFILLED = 'ADD_ZONE_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_ZONE_PENDING:
      return true;
    case ADD_ZONE_REJECTED:
    case ADD_ZONE_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addZone = data => {
  return {
    type: 'ADD_ZONE',
    payload: client.service('zones').create(data)
  };
};

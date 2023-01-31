import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_EVENT_PENDING = 'ADD_EVENT_PENDING';
export const ADD_EVENT_REJECTED = 'ADD_EVENT_REJECTED';
export const ADD_EVENT_FULFILLED = 'ADD_EVENT_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_EVENT_PENDING:
      return true;
    case ADD_EVENT_REJECTED:
    case ADD_EVENT_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addEvent = data => {
  return {
    type: 'ADD_EVENT',
    payload: client.service('events').create(data)
  };
};

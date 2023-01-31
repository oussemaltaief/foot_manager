import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_EVENT_PENDING = 'REQUEST_EVENT_PENDING';
export const REQUEST_EVENT_REJECTED = 'REQUEST_EVENT_REJECTED';
export const REQUEST_EVENT_FULFILLED = 'REQUEST_EVENT_FULFILLED';
export const UPDATE_EVENT_PENDING = 'UPDATE_EVENT_PENDING';
export const UPDATE_EVENT_REJECTED = 'UPDATE_EVENT_REJECTED';
export const UPDATE_EVENT_FULFILLED = 'UPDATE_EVENT_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_EVENT_PENDING:
    case UPDATE_EVENT_PENDING:
      return true;
    case REQUEST_EVENT_REJECTED:
    case UPDATE_EVENT_REJECTED:
    case REQUEST_EVENT_FULFILLED:
    case UPDATE_EVENT_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const fetchEvent = id => {
  return (dispatch, getState) => {
    const event = getState().events.byId[id];

    return dispatch({
      type: 'REQUEST_EVENT',
      payload: event ? Promise.resolve(event) : client.service('events').get(id)
    });
  };
};

export const updateEvent = (id, data) => {
  return {
    type: 'UPDATE_EVENT',
    payload: client.service('events').update(id, data)
  };
};

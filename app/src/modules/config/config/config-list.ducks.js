import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_CONFIG_PENDING = 'REQUEST_CONFIG_PENDING';
export const REQUEST_CONFIG_REJECTED = 'REQUEST_CONFIG_REJECTED';
export const REQUEST_CONFIG_FULFILLED = 'REQUEST_CONFIG_FULFILLED';

export const ADD_CONFIG_PENDING = 'ADD_CONFIG_PENDING';
export const ADD_CONFIG_REJECTED = 'ADD_CONFIG_REJECTED';
export const ADD_CONFIG_FULFILLED = 'ADD_CONFIG_FULFILLED';

export const UPDATE_CONFIG_PENDING = 'UPDATE_CONFIG_PENDING';
export const UPDATE_CONFIG_REJECTED = 'UPDATE_CONFIG_REJECTED';
export const UPDATE_CONFIG_FULFILLED = 'UPDATE_CONFIG_FULFILLED';

// Reducers

const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_CONFIG_PENDING:
    case ADD_CONFIG_PENDING:
    case UPDATE_CONFIG_PENDING:
      return true;
    case REQUEST_CONFIG_REJECTED:
    case REQUEST_CONFIG_FULFILLED:
    case ADD_CONFIG_REJECTED:
    case ADD_CONFIG_FULFILLED:
    case UPDATE_CONFIG_REJECTED:
    case UPDATE_CONFIG_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_CONFIG_FULFILLED:
      return payload.data.map(config => config._id);
    default:
      return state;
  }
};

export const addConfig = data => {
  return {
    type: 'ADD_CONFIG',
    payload: client.service('config').create(data)
  };
};

export const updateConfig = (id, data) => {
  return {
    type: 'UPDATE_CONFIG',
    payload: client.service('config').update(id, data)
  };
};

export default combineReducers({
  loading,
  ids
});

// Action Creators

export const fetchConfig = ({ limit = 1 }) => {
  const query = {
    query: {
      $limit: limit
    }
  };
  return {
    type: 'REQUEST_CONFIG',
    payload: client.service('config').find(query)
  };
};

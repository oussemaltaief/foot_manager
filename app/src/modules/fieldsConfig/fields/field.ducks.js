import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_FIELD_PENDING = 'REQUEST_FIELD_PENDING';
export const REQUEST_FIELD_REJECTED = 'REQUEST_FIELD_REJECTED';
export const REQUEST_FIELD_FULFILLED = 'REQUEST_FIELD_FULFILLED';

export const ADD_FIELDS_PENDING = 'ADD_FIELDS_PENDING';
export const ADD_FIELDS_REJECTED = 'ADD_FIELDS_REJECTED';
export const ADD_FIELDS_FULFILLED = 'ADD_FIELDS_FULFILLED';

export const UPDATE_FIELDS_PENDING = 'UPDATE_FIELDS_PENDING';
export const UPDATE_FIELDS_REJECTED = 'UPDATE_FIELDS_REJECTED';
export const UPDATE_FIELDS_FULFILLED = 'UPDATE_FIELDS_FULFILLED';

// Reducers

const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_FIELD_PENDING:
    case ADD_FIELDS_PENDING:
    case UPDATE_FIELDS_PENDING:
      return true;
    case REQUEST_FIELD_REJECTED:
    case REQUEST_FIELD_FULFILLED:
    case ADD_FIELDS_REJECTED:
    case ADD_FIELDS_FULFILLED:
    case UPDATE_FIELDS_REJECTED:
    case UPDATE_FIELDS_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_FIELD_FULFILLED:
      return payload.data.map(fields => fields._id);
    default:
      return state;
  }
};

export const addFieldsConfig = data => {
  return {
    type: 'ADD_FIELDS',
    payload: client.service('fields-config').create(data)
  };
};

export const updateFieldsConfig = (id, data) => {
  return {
    type: 'UPDATE_FIELDS',
    payload: client.service('fields-config').update(id, data)
  };
};

export default combineReducers({
  loading,
  ids
});

// Action Creators

export const fetchFieldsConfig = ({ limit = 1 }) => {
  const query = {
    query: {
      $limit: limit
    }
  };
  return {
    type: 'REQUEST_FIELD',
    payload: client.service('fields-config').find(query)
  };
};

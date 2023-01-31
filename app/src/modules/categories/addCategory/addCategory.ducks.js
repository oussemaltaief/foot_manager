import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_CATEGORY_PENDING = 'ADD_CATEGORY_PENDING';
export const ADD_CATEGORY_REJECTED = 'ADD_CATEGORY_REJECTED';
export const ADD_CATEGORY_FULFILLED = 'ADD_CATEGORY_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_CATEGORY_PENDING:
      return true;
    case ADD_CATEGORY_REJECTED:
    case ADD_CATEGORY_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addCategory = data => {
  return {
    type: 'ADD_CATEGORY',
    payload: client.service('categories').create(data)
  };
};

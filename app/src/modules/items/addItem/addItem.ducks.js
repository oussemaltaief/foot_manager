import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_ITEM_PENDING = 'ADD_ITEM_PENDING';
export const ADD_ITEM_REJECTED = 'ADD_ITEM_REJECTED';
export const ADD_ITEM_FULFILLED = 'ADD_ITEM_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_ITEM_PENDING:
      return true;
    case ADD_ITEM_REJECTED:
    case ADD_ITEM_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addItem = data => {
  return {
    type: 'ADD_ITEM',
    payload: client.service('items').create(data)
  };
};

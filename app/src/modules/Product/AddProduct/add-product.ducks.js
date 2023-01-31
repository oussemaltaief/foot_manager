import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_PRODUCT_PENDING = 'ADD_PRODUCT_PENDING';
export const ADD_PRODUCT_REJECTED = 'ADD_PRODUCT_REJECTED';
export const ADD_PRODUCT_FULFILLED = 'ADD_PRODUCT_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_PRODUCT_PENDING:
      return true;
    case ADD_PRODUCT_REJECTED:
    case ADD_PRODUCT_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addProduct = data => {
  return {
    type: 'ADD_PRODUCT',
    payload: client.service('products').create(data)
  };
};

import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_PRODUCT_PENDING = 'REQUEST_PRODUCT_PENDING';
export const REQUEST_PRODUCT_REJECTED = 'REQUEST_PRODUCT_REJECTED';
export const REQUEST_PRODUCT_FULFILLED = 'REQUEST_PRODUCT_FULFILLED';
export const UPDATE_PRODUCT_PENDING = 'UPDATE_PRODUCT_PENDING';
export const UPDATE_PRODUCT_REJECTED = 'UPDATE_PRODUCT_REJECTED';
export const UPDATE_PRODUCT_FULFILLED = 'UPDATE_PRODUCT_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_PRODUCT_PENDING:
    case UPDATE_PRODUCT_PENDING:
      return true;
    case REQUEST_PRODUCT_REJECTED:
    case UPDATE_PRODUCT_REJECTED:
    case REQUEST_PRODUCT_FULFILLED:
    case UPDATE_PRODUCT_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const fetchProduct = id => {
  return (dispatch, getState) => {
    const products = getState().products.byId[id];

    return dispatch({
      type: 'REQUEST_PRODUCT',
      payload: products
        ? Promise.resolve(products)
        : client.service('product').get(id)
    });
  };
};

export const updateProduct = (id, data) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: client.service('products').update(id, data)
  };
};

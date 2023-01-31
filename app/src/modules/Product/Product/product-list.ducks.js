import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_PRODUCTS_PENDING = 'REQUEST_PRODUCTS_PENDING';
export const REQUEST_PRODUCTS_REJECTED = 'REQUEST_PRODUCTS_REJECTED';
export const REQUEST_PRODUCTS_FULFILLED = 'REQUEST_PRODUCTS_FULFILLED';

export const REMOVE_PRODUCT_PENDING = 'REMOVE_PRODUCT_PENDING';
export const REMOVE_PRODUCT_REJECTED = 'REMOVE_PRODUCT_REJECTED';
export const REMOVE_PRODUCT_FULFILLED = 'REMOVE_PRODUCT_FULFILLED';

// Reducers

const loadingProducts = (state = true, { type }) => {
  switch (type) {
    case REQUEST_PRODUCTS_PENDING:
    case REMOVE_PRODUCT_PENDING:
      return true;
    case REQUEST_PRODUCTS_REJECTED:
    case REQUEST_PRODUCTS_FULFILLED:
    case REMOVE_PRODUCT_REJECTED:
    case REMOVE_PRODUCT_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_PRODUCTS_FULFILLED:
      return payload.data.map(client => client._id);
    case REMOVE_PRODUCT_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_PRODUCTS_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_PRODUCTS_FULFILLED:
      return payload.skip / payload.limit + 1;
    default:
      return state;
  }
};

export default combineReducers({
  loadingProducts,
  ids,
  total,
  page
});

// Action Creators

export const fetchProduct = ({
  page = 1,
  limit = 10,
  sort: $sort = { ref: 1 },
  filter = {}
}) => {
  const query = {
    query: {
      $limit: limit,
      $skip: getSkipFromLimitAndPage(limit, page),
      $sort,
      ...filter
    }
  };
  return {
    type: 'REQUEST_PRODUCTS',
    payload: client.service('products').find(query)
  };
};

export const fetchAllProducts = ({
  limit = -1,
  sort: $sort = { ref: 1 },
  filter = {}
}) => {
  const query = {
    query: {
      $limit: limit,
      $sort,
      ...filter
    }
  };
  return {
    type: 'REQUEST_ALL_PRODUCTS',
    payload: client.service('products').find(query)
  };
};

export const deleteProduct = id => {
  return {
    type: 'REMOVE_PRODUCT',
    payload: client.service('products').remove(id)
  };
};

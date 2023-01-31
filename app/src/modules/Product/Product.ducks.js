import { combineReducers } from 'redux';

import client from '../../utils/client';

import productsList, {
  REQUEST_PRODUCTS_FULFILLED,
  REMOVE_PRODUCT_FULFILLED
} from './Product/product-list.ducks';
import addProduct, {
  ADD_PRODUCT_FULFILLED
} from './AddProduct/add-product.ducks';
import editProduct, {
  REQUEST_PRODUCT_FULFILLED,
  UPDATE_PRODUCT_FULFILLED
} from './EditProduct/edit-product.ducks';

export const REQUEST_ALL_PRODUCTS_PENDING = 'REQUEST_ALL_PRODUCTS_PENDING';
export const REQUEST_ALL_PRODUCTS_REJECTED = 'REQUEST_ALL_PRODUCTS_REJECTED';
export const REQUEST_ALL_PRODUCTS_FULFILLED = 'REQUEST_ALL_PRODUCTS_FULFILLED';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_PRODUCTS_FULFILLED:
      return [
        ...new Set(state.concat(payload.data.map(product => product._id)))
      ];
    case REQUEST_ALL_PRODUCTS_FULFILLED:
      return [...new Set(state.concat(payload.map(product => product._id)))];
    case ADD_PRODUCT_FULFILLED:
    case REQUEST_PRODUCT_FULFILLED:
    case UPDATE_PRODUCT_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_PRODUCTS_FULFILLED:
      return payload.data.reduce(
        (res, product) => Object.assign({}, { [product._id]: product }, res),
        state
      );
    case REQUEST_ALL_PRODUCTS_FULFILLED:
      return payload.reduce(
        (res, product) => Object.assign({}, { [product._id]: product }, res),
        state
      );
    case ADD_PRODUCT_FULFILLED:
    case REQUEST_PRODUCT_FULFILLED:
    case UPDATE_PRODUCT_FULFILLED:
    case REMOVE_PRODUCT_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: productsList,
  add: addProduct,
  edit: editProduct
});

// Action Creators

export const fetchAllProducts = () => {
  const query = {
    query: { $limit: -1, $sort: { name: 1 } }
  };

  return {
    type: 'REQUEST_ALL_PRODUCTS',
    payload: client.service('products').find(query)
  };
};

import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_CATEGORY_PENDING = 'REQUEST_CATEGORY_PENDING';
export const REQUEST_CATEGORY_REJECTED = 'REQUEST_CATEGORY_REJECTED';
export const REQUEST_CATEGORY_FULFILLED = 'REQUEST_CATEGORY_FULFILLED';
export const UPDATE_CATEGORY_PENDING = 'UPDATE_CATEGORY_PENDING';
export const UPDATE_CATEGORY_REJECTED = 'UPDATE_CATEGORY_REJECTED';
export const UPDATE_CATEGORY_FULFILLED = 'UPDATE_CATEGORY_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_CATEGORY_PENDING:
    case UPDATE_CATEGORY_PENDING:
      return true;
    case REQUEST_CATEGORY_REJECTED:
    case UPDATE_CATEGORY_REJECTED:
    case REQUEST_CATEGORY_FULFILLED:
    case UPDATE_CATEGORY_FULFILLED:
      return false;
    default:
      return state;
  }
};

// Action Creators

export const fetchCategory = id => {
  return (dispatch, getState) => {
    const category = getState().categories.byId[id];

    return dispatch({
      type: 'REQUEST_CATEGORY',
      payload: category
        ? Promise.resolve(category)
        : client.service('categories').get(id)
    });
  };
};

export const updateCategory = (id, data) => {
  return {
    type: 'UPDATE_CATEGORY',
    payload: client.service('categories').update(id, data)
  };
};

export default combineReducers({ loading });

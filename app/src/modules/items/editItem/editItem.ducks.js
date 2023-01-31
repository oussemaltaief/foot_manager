import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_ITEM_PENDING = 'REQUEST_ITEM_PENDING';
export const REQUEST_ITEM_REJECTED = 'REQUEST_ITEM_REJECTED';
export const REQUEST_ITEM_FULFILLED = 'REQUEST_ITEM_FULFILLED';
export const UPDATE_ITEM_PENDING = 'UPDATE_ITEM_PENDING';
export const UPDATE_ITEM_REJECTED = 'UPDATE_ITEM_REJECTED';
export const UPDATE_ITEM_FULFILLED = 'UPDATE_ITEM_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_ITEM_PENDING:
    case UPDATE_ITEM_PENDING:
      return true;
    case REQUEST_ITEM_REJECTED:
    case UPDATE_ITEM_REJECTED:
    case REQUEST_ITEM_FULFILLED:
    case UPDATE_ITEM_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const fetchItem = id => {
  return (dispatch, getState) => {
    const items = getState().items.byId[id];

    return dispatch({
      type: 'REQUEST_ITEM',
      payload: items ? Promise.resolve(items) : client.service('items').get(id)
    });
  };
};

export const updateItem = (id, data) => {
  return {
    type: 'UPDATE_ITEM',
    payload: client.service('items').update(id, data)
  };
};

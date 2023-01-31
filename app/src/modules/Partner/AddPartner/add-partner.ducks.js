import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_PARTNER_PENDING = 'ADD_PARTNER_PENDING';
export const ADD_PARTNER_REJECTED = 'ADD_PARTNER_REJECTED';
export const ADD_PARTNER_FULFILLED = 'ADD_PARTNER_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_PARTNER_PENDING:
      return true;
    case ADD_PARTNER_REJECTED:
    case ADD_PARTNER_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addPartner = data => {
  return {
    type: 'ADD_PARTNER',
    payload: client.service('partners').create(data)
  };
};

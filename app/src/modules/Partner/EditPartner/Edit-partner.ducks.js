import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_PARTNER_PENDING = 'REQUEST_PARTNER_PENDING';
export const REQUEST_PARTNER_REJECTED = 'REQUEST_PARTNER_REJECTED';
export const REQUEST_PARTNER_FULFILLED = 'REQUEST_PARTNER_FULFILLED';

export const UPDATE_PARTNER_PENDING = 'UPDATE_PARTNER_PENDING';
export const UPDATE_PARTNER_REJECTED = 'UPDATE_PARTNER_REJECTED';
export const UPDATE_PARTNER_FULFILLED = 'UPDATE_PARTNER_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_PARTNER_PENDING:
    case UPDATE_PARTNER_PENDING:
      return true;
    case REQUEST_PARTNER_REJECTED:
    case UPDATE_PARTNER_REJECTED:
    case REQUEST_PARTNER_FULFILLED:
    case UPDATE_PARTNER_FULFILLED:
      return false;
    default:
      return state;
  }
};

// Action Creators

export const fetchPartner = id => {
  return (dispatch, getState) => {
    const partner = getState().partners.byId[id];

    return dispatch({
      type: 'REQUEST_PARTNER',
      payload: partner
        ? Promise.resolve(partner)
        : client.service('partners').get(id)
    });
  };
};

export const updatePartner = (id, data) => {
  return {
    type: 'UPDATE_PARTNER',
    payload: client.service('partners').update(id, data)
  };
};

export default combineReducers({ loading });

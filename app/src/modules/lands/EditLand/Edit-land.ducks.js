import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_LAND_PENDING = 'REQUEST_LAND_PENDING';
export const REQUEST_LAND_REJECTED = 'REQUEST_LAND_REJECTED';
export const REQUEST_LAND_FULFILLED = 'REQUEST_LAND_FULFILLED';

export const UPDATE_LAND_PENDING = 'UPDATE_LAND_PENDING';
export const UPDATE_LAND_REJECTED = 'UPDATE_LAND_REJECTED';
export const UPDATE_LAND_FULFILLED = 'UPDATE_LAND_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_LAND_PENDING:
    case UPDATE_LAND_PENDING:
      return true;
    case REQUEST_LAND_REJECTED:
    case UPDATE_LAND_REJECTED:
    case REQUEST_LAND_FULFILLED:
    case UPDATE_LAND_FULFILLED:
      return false;
    default:
      return state;
  }
};

// Action Creators

export const fetchLand = id => {
  return (dispatch, getState) => {
    const land = getState().lands.byId[id];

    return dispatch({
      type: 'REQUEST_LAND',
      payload: land ? Promise.resolve(land) : client.service('lands').get(id)
    });
  };
};

export const updateLand = (id, data) => {
  return {
    type: 'UPDATE_LAND',
    payload: client.service('lands').update(id, data)
  };
};

export default combineReducers({ loading });

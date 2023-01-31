import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_ZONE_PENDING = 'REQUEST_ZONE_PENDING';
export const REQUEST_ZONE_REJECTED = 'REQUEST_ZONE_REJECTED';
export const REQUEST_ZONE_FULFILLED = 'REQUEST_ZONE_FULFILLED';

export const UPDATE_ZONE_PENDING = 'UPDATE_ZONE_PENDING';
export const UPDATE_ZONE_REJECTED = 'UPDATE_ZONE_REJECTED';
export const UPDATE_ZONE_FULFILLED = 'UPDATE_ZONE_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_ZONE_PENDING:
    case UPDATE_ZONE_PENDING:
      return true;
    case REQUEST_ZONE_REJECTED:
    case UPDATE_ZONE_REJECTED:
    case REQUEST_ZONE_FULFILLED:
    case UPDATE_ZONE_FULFILLED:
      return false;
    default:
      return state;
  }
};

// Action Creators

export const fetchZone = id => {
  return (dispatch, getState) => {
    const zones = getState().zones.byId[id];

    return dispatch({
      type: 'REQUEST_ZONE',
      payload: zones ? Promise.resolve(zones) : client.service('zones').get(id)
    });
  };
};

export const updateZone = (id, data) => {
  return {
    type: 'UPDATE_ZONE',
    payload: client.service('zones').update(id, data)
  };
};

export default combineReducers({ loading });

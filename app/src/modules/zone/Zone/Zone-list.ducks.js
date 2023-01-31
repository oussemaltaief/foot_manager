import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_ZONES_PENDING = 'REQUEST_ZONES_PENDING';
export const REQUEST_ZONES_REJECTED = 'REQUEST_ZONES_REJECTED';
export const REQUEST_ZONES_FULFILLED = 'REQUEST_ZONES_FULFILLED';

export const REMOVE_ZONE_PENDING = 'REMOVE_ZONE_PENDING';
export const REMOVE_ZONE_REJECTED = 'REMOVE_ZONE_REJECTED';
export const REMOVE_ZONE_FULFILLED = 'REMOVE_ZONE_FULFILLED';

// Reducers

const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_ZONES_PENDING:
    case REMOVE_ZONE_PENDING:
      return true;
    case REQUEST_ZONES_REJECTED:
    case REMOVE_ZONE_REJECTED:
    case REQUEST_ZONES_FULFILLED:
    case REMOVE_ZONE_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_ZONES_FULFILLED:
      return payload.data.map(zone => zone._id);
    case REMOVE_ZONE_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_ZONES_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_ZONES_FULFILLED:
      return payload.skip / payload.limit + 1;
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  ids,
  total,
  page
});

// Action Creators

export const fetchZones = ({
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
    type: 'REQUEST_ZONES',
    payload: client.service('zones').find(query)
  };
};

export const deleteZone = (id, data) => {
  return {
    type: 'REMOVE_ZONE',
    payload: client.service('zone').update(id, data)
  };
};

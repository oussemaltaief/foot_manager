import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_LANDS_PENDING = 'REQUEST_LANDS_PENDING';
export const REQUEST_LANDS_REJECTED = 'REQUEST_LANDS_REJECTED';
export const REQUEST_LANDS_FULFILLED = 'REQUEST_LANDS_FULFILLED';

export const REMOVE_LAND_PENDING = 'REMOVE_LAND_PENDING';
export const REMOVE_LAND_REJECTED = 'REMOVE_LAND_REJECTED';
export const REMOVE_LAND_FULFILLED = 'REMOVE_LAND_FULFILLED';

// Reducers

const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_LANDS_PENDING:
    case REMOVE_LAND_PENDING:
      return true;
    case REQUEST_LANDS_REJECTED:
    case REQUEST_LANDS_FULFILLED:
    case REMOVE_LAND_REJECTED:
    case REMOVE_LAND_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_LANDS_FULFILLED:
      return payload.data.map(game => game._id);
    case REMOVE_LAND_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_LANDS_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_LANDS_FULFILLED:
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

export const fetchLands = ({
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
    type: 'REQUEST_LANDS',
    payload: client.service('lands').find(query)
  };
};

export const deleteLand = id => {
  return {
    type: 'REMOVE_LAND',
    payload: client.service('lands').remove(id)
  };
};

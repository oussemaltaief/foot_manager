import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_COACHES_PENDING = 'REQUEST_COACHES_PENDING';
export const REQUEST_COACHES_REJECTED = 'REQUEST_COACHES_REJECTED';
export const REQUEST_COACHES_FULFILLED = 'REQUEST_COACHES_FULFILLED';

export const REMOVE_COACH_PENDING = 'REMOVE_COACH_PENDING';
export const REMOVE_COACH_REJECTED = 'REMOVE_COACH_REJECTED';
export const REMOVE_COACH_FULFILLED = 'REMOVE_COACH_FULFILLED';

// Reducers

const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_COACHES_PENDING:
    case REMOVE_COACH_PENDING:
      return true;
    case REQUEST_COACHES_REJECTED:
    case REQUEST_COACHES_FULFILLED:
    case REMOVE_COACH_REJECTED:
    case REMOVE_COACH_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_COACHES_FULFILLED:
      return payload.data.map(game => game._id);
    case REMOVE_COACH_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_COACHES_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_COACHES_FULFILLED:
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

export const fetchCoaches = ({
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
    type: 'REQUEST_COACHES',
    payload: client.service('coaches').find(query)
  };
};

export const deleteCoach = id => {
  return {
    type: 'REMOVE_COACH',
    payload: client.service('coaches').remove(id)
  };
};

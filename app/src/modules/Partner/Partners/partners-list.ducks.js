import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_PARTNERS_PENDING = 'REQUEST_PARTNERS_PENDING';
export const REQUEST_PARTNERS_REJECTED = 'REQUEST_PARTNERS_REJECTED';
export const REQUEST_PARTNERS_FULFILLED = 'REQUEST_PARTNERS_FULFILLED';

export const REMOVE_PARTNER_PENDING = 'REMOVE_PARTNER_PENDING';
export const REMOVE_PARTNER_REJECTED = 'REMOVE_PARTNER_REJECTED';
export const REMOVE_PARTNER_FULFILLED = 'REMOVE_PARTNER_FULFILLED';

// Reducers

const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_PARTNERS_PENDING:
    case REMOVE_PARTNER_PENDING:
      return true;
    case REQUEST_PARTNERS_REJECTED:
    case REQUEST_PARTNERS_FULFILLED:
    case REMOVE_PARTNER_REJECTED:
    case REMOVE_PARTNER_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_PARTNERS_FULFILLED:
      return payload.data.map(game => game._id);
    case REMOVE_PARTNER_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_PARTNERS_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_PARTNERS_FULFILLED:
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

export const fetchPartners = ({
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
    type: 'REQUEST_PARTNERS',
    payload: client.service('partners').find(query)
  };
};

export const fetchAllPartners = ({
  limit = -1,
  sort: $sort = { ref: 1 },
  filter = {}
}) => {
  const query = {
    query: {
      $limit: limit,
      $sort,
      ...filter
    }
  };
  return {
    type: 'REQUEST_ALL_PARTNERS',
    payload: client.service('partners').find(query)
  };
};

export const deletePartner = id => {
  return {
    type: 'REMOVE_PARTNER',
    payload: client.service('partners').remove(id)
  };
};

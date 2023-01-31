import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_USERS_PENDING = 'REQUEST_USERS_PENDING';
export const REQUEST_USERS_REJECTED = 'REQUEST_USERS_REJECTED';
export const REQUEST_USERS_FULFILLED = 'REQUEST_USERS_FULFILLED';

export const REMOVE_USER_PENDING = 'REMOVE_USER_PENDING';
export const REMOVE_USER_REJECTED = 'REMOVE_USER_REJECTED';
export const REMOVE_USER_FULFILLED = 'REMOVE_USER_FULFILLED';

// Reducers

const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_USERS_PENDING:
    case REMOVE_USER_PENDING:
      return true;
    case REQUEST_USERS_REJECTED:
    case REQUEST_USERS_FULFILLED:
    case REMOVE_USER_REJECTED:
    case REMOVE_USER_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_USERS_FULFILLED:
      return payload.data.map(user => user._id);
    case REMOVE_USER_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_USERS_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_USERS_FULFILLED:
      return payload.skip / payload.limit + 1;
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  ids,
  page,
  total
});

// Action Creators

export const fetchUsers = ({
  page = 1,
  limit = 10,
  sort: $sort = { createdAt: -1 },
  filter = {}
}) => {
  if (!$sort.lastName) {
    $sort.lastName = 1;
  }

  if (!$sort.firstName) {
    $sort.firstName = 1;
  }

  const query = {
    query: {
      $limit: limit,
      $skip: getSkipFromLimitAndPage(limit, page),
      $sort,
      ...filter
    }
  };
  return {
    type: 'REQUEST_USERS',
    payload: client.service('users').find(query)
  };
};

export const deleteUser = id => {
  return {
    type: 'REMOVE_USER',
    payload: client.service('users').remove(id)
  };
};

import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_ROLES_PENDING = 'REQUEST_ROLES_PENDING';
export const REQUEST_ROLES_REJECTED = 'REQUEST_ROLES_REJECTED';
export const REQUEST_ROLES_FULFILLED = 'REQUEST_ROLES_FULFILLED';

export const REMOVE_ROLE_PENDING = 'REMOVE_ROLE_PENDING';
export const REMOVE_ROLE_REJECTED = 'REMOVE_ROLE_REJECTED';
export const REMOVE_ROLE_FULFILLED = 'REMOVE_ROLE_FULFILLED';

// Reducers

const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_ROLES_PENDING:
    case REMOVE_ROLE_PENDING:
      return true;
    case REQUEST_ROLES_REJECTED:
    case REMOVE_ROLE_REJECTED:
    case REQUEST_ROLES_FULFILLED:
    case REMOVE_ROLE_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_ROLES_FULFILLED:
      return payload.data.map(station => station._id);
    case REMOVE_ROLE_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_ROLES_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_ROLES_FULFILLED:
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

export const fetchRoles = ({
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
    type: 'REQUEST_ROLES',
    payload: client.service('roles').find(query)
  };
};

export const deleteRole = (id, data) => {
  return {
    type: 'REMOVE_ROLE',
    payload: client.service('roles').update(id, data)
  };
};

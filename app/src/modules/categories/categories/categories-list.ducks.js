import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_CATEGORIES_PENDING = 'REQUEST_CATEGORIES_PENDING';
export const REQUEST_CATEGORIES_REJECTED = 'REQUEST_CATEGORIES_REJECTED';
export const REQUEST_CATEGORIES_FULFILLED = 'REQUEST_CATEGORIES_FULFILLED';

export const REMOVE_CATEGORY_PENDING = 'REMOVE_CATEGORY_PENDING';
export const REMOVE_CATEGORY_REJECTED = 'REMOVE_CATEGORY_REJECTED';
export const REMOVE_CATEGORY_FULFILLED = 'REMOVE_CATEGORY_FULFILLED';

// Reducers
const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_CATEGORIES_PENDING:
    case REMOVE_CATEGORY_PENDING:
      return true;
    case REQUEST_CATEGORIES_REJECTED:
    case REMOVE_CATEGORY_REJECTED:
    case REQUEST_CATEGORIES_FULFILLED:
    case REMOVE_CATEGORY_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_CATEGORIES_FULFILLED:
      return payload.data.map(station => station._id);
    case REMOVE_CATEGORY_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_CATEGORIES_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_CATEGORIES_FULFILLED:
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

export const fetchCategories = ({
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
    type: 'REQUEST_CATEGORIES',
    payload: client.service('categories').find(query)
  };
};

export const deleteCategory = (id, data) => {
  return {
    type: 'REMOVE_CATEGORY',
    payload: client.service('categories').remove(id, data)
  };
};

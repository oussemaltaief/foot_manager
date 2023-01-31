import { combineReducers } from 'redux';

import client from '../../utils/client';

import categoriesList, {
  REQUEST_CATEGORIES_FULFILLED,
  REMOVE_CATEGORY_FULFILLED
} from './categories/categories-list.ducks';
import addCategory, {
  ADD_CATEGORY_FULFILLED
} from './addCategory/addCategory.ducks';
import editCategory, {
  REQUEST_CATEGORY_FULFILLED,
  UPDATE_CATEGORY_FULFILLED
} from './editCategory/editCategory.ducks';

export const REQUEST_ALL_CATEGORIES_PENDING = 'REQUEST_ALL_CATEGORIES_PENDING';
export const REQUEST_ALL_CATEGORIES_REJECTED =
  'REQUEST_ALL_CATEGORIES_REJECTED';
export const REQUEST_ALL_CATEGORIES_FULFILLED =
  'REQUEST_ALL_CATEGORIES_FULFILLED';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_CATEGORIES_FULFILLED:
      return [...new Set(state.concat(payload.data.map(roles => roles._id)))];
    case REQUEST_ALL_CATEGORIES_FULFILLED:
      return [...new Set(state.concat(payload.map(roles => roles._id)))];
    case ADD_CATEGORY_FULFILLED:
    case REQUEST_CATEGORY_FULFILLED:
    case UPDATE_CATEGORY_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_CATEGORIES_FULFILLED:
      return payload.data.reduce(
        (res, roles) => Object.assign({}, { [roles._id]: roles }, res),
        state
      );
    case REQUEST_ALL_CATEGORIES_FULFILLED:
      return payload.reduce(
        (res, roles) => Object.assign({}, { [roles._id]: roles }, res),
        state
      );
    case ADD_CATEGORY_FULFILLED:
    case REQUEST_CATEGORY_FULFILLED:
    case UPDATE_CATEGORY_FULFILLED:
    case REMOVE_CATEGORY_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: categoriesList,
  add: addCategory,
  edit: editCategory
});

// Action Creators

export const fetchAllCategories = () => {
  const query = {
    query: { $limit: -1 }
  };

  return {
    type: 'REQUEST_ALL_CATEGORIES',
    payload: client.service('categories').find(query)
  };
};

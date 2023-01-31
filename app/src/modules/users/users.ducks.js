import { combineReducers } from 'redux';

import client from '../../utils/client';

import usersList, { REQUEST_USERS_FULFILLED } from './Users/users-list.ducks';
import addUser, { ADD_USER_FULFILLED } from './AddUser/add-user.ducks';
import editUser, {
  REQUEST_USER_FULFILLED,
  UPDATE_USER_FULFILLED
} from './EditUser/edit-user.ducks';

export const REQUEST_ALL_USERS_PENDING = 'REQUEST_ALL_USERS_PENDING';
export const REQUEST_ALL_USERS_REJECTED = 'REQUEST_ALL_USERS_REJECTED';
export const REQUEST_ALL_USERS_FULFILLED = 'REQUEST_ALL_USERS_FULFILLED';
// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_USERS_FULFILLED:
      return [...new Set(state.concat(payload.data.map(user => user._id)))];
    case REQUEST_ALL_USERS_FULFILLED:
      return [...new Set(state.concat(payload.data.map(user => user._id)))];
    case ADD_USER_FULFILLED:
    case REQUEST_USER_FULFILLED:
    case UPDATE_USER_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_USERS_FULFILLED:
      return payload.data.reduce(
        (res, user) => Object.assign({}, { [user._id]: user }, res),
        state
      );
    case REQUEST_ALL_USERS_FULFILLED:
      return payload.data.reduce(
        (res, users) => Object.assign({}, { [users._id]: users }, res),
        state
      );
    case ADD_USER_FULFILLED:
    case REQUEST_USER_FULFILLED:
    case UPDATE_USER_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: usersList,
  add: addUser,
  edit: editUser
});

export const fetchAllUsers = () => {
  const query = {
    query: { $sort: { name: 1 } }
  };

  return {
    type: 'REQUEST_ALL_USERS',
    payload: client.service('users').find(query)
  };
};

import { combineReducers } from 'redux';

import client from '../../utils/client';

import rolessList, {
  REQUEST_ROLES_FULFILLED,
  REMOVE_ROLE_FULFILLED
} from './roles/roles-list.ducks';
import addRole, { ADD_ROLES_FULFILLED } from './AddRoles/add-roles.ducks';
import editRole, {
  REQUEST_ROLE_FULFILLED,
  UPDATE_ROLE_FULFILLED
} from './EditRoles/edit-roles.ducks';

export const REQUEST_ALL_ROLES_PENDING = 'REQUEST_ALL_ROLES_PENDING';
export const REQUEST_ALL_ROLES_REJECTED = 'REQUEST_ALL_ROLES_REJECTED';
export const REQUEST_ALL_ROLES_FULFILLED = 'REQUEST_ALL_ROLES_FULFILLED';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_ROLES_FULFILLED:
      return [...new Set(state.concat(payload.data.map(roles => roles._id)))];
    case REQUEST_ALL_ROLES_FULFILLED:
      return [...new Set(state.concat(payload.map(roles => roles._id)))];
    case ADD_ROLES_FULFILLED:
    case REQUEST_ROLE_FULFILLED:
    case UPDATE_ROLE_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_ROLES_FULFILLED:
      return payload.data.reduce(
        (res, roles) => Object.assign({}, { [roles._id]: roles }, res),
        state
      );
    case REQUEST_ALL_ROLES_FULFILLED:
      return payload.reduce(
        (res, roles) => Object.assign({}, { [roles._id]: roles }, res),
        state
      );
    case ADD_ROLES_FULFILLED:
    case REQUEST_ROLE_FULFILLED:
    case UPDATE_ROLE_FULFILLED:
    case REMOVE_ROLE_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: rolessList,
  add: addRole,
  edit: editRole
});

// Action Creators

export const fetchAllRoles = () => {
  const query = {
    query: { $limit: -1, $sort: { name: 1 } }
  };

  return {
    type: 'REQUEST_ALL_ROLES',
    payload: client.service('roles').find(query)
  };
};

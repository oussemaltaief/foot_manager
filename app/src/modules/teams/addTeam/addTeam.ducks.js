import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_TEAM_PENDING = 'ADD_TEAM_PENDING';
export const ADD_TEAM_REJECTED = 'ADD_TEAM_REJECTED';
export const ADD_TEAM_FULFILLED = 'ADD_TEAM_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_TEAM_PENDING:
      return true;
    case ADD_TEAM_REJECTED:
    case ADD_TEAM_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addTeam = data => {
  return {
    type: 'ADD_TEAM',
    payload: client.service('teams').create(data)
  };
};

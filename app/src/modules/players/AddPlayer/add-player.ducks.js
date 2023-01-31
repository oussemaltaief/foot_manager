import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_PLAYER_PENDING = 'ADD_PLAYER_PENDING';
export const ADD_PLAYER_REJECTED = 'ADD_PLAYER_REJECTED';
export const ADD_PLAYER_FULFILLED = 'ADD_PLAYER_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_PLAYER_PENDING:
      return true;
    case ADD_PLAYER_REJECTED:
    case ADD_PLAYER_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addPlayer = data => {
  return {
    type: 'ADD_PLAYER',
    payload: client.service('players').create(data)
  };
};

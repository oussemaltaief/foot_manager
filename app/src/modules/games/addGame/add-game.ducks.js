import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_GAME_PENDING = 'ADD_GAME_PENDING';
export const ADD_GAME_REJECTED = 'ADD_GAME_REJECTED';
export const ADD_GAME_FULFILLED = 'ADD_GAME_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_GAME_PENDING:
      return true;
    case ADD_GAME_REJECTED:
    case ADD_GAME_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addGame = data => {
  return {
    type: 'ADD_GAME',
    payload: client.service('games').create(data)
  };
};

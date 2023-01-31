import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_GAME_PENDING = 'REQUEST_GAME_PENDING';
export const REQUEST_GAME_REJECTED = 'REQUEST_GAME_REJECTED';
export const REQUEST_GAME_FULFILLED = 'REQUEST_GAME_FULFILLED';
export const UPDATE_GAME_PENDING = 'UPDATE_GAME_PENDING';
export const UPDATE_GAME_REJECTED = 'UPDATE_GAME_REJECTED';
export const UPDATE_GAME_FULFILLED = 'UPDATE_GAME_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_GAME_PENDING:
    case UPDATE_GAME_PENDING:
      return true;
    case REQUEST_GAME_REJECTED:
    case UPDATE_GAME_REJECTED:
    case REQUEST_GAME_FULFILLED:
    case UPDATE_GAME_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const fetchGame = id => {
  return (dispatch, getState) => {
    const games = getState().games.byId[id];

    return dispatch({
      type: 'REQUEST_GAME',
      payload: games ? Promise.resolve(games) : client.service('games').get(id)
    });
  };
};

export const updateGame = (id, data) => {
  return {
    type: 'UPDATE_GAME',
    payload: client.service('games').update(id, data)
  };
};

import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_PLAYER_PENDING = 'REQUEST_PLAYER_PENDING';
export const REQUEST_PLAYER_REJECTED = 'REQUEST_PLAYER_REJECTED';
export const REQUEST_PLAYER_FULFILLED = 'REQUEST_PLAYER_FULFILLED';
export const UPDATE_PLAYER_PENDING = 'UPDATE_PLAYER_PENDING';
export const UPDATE_PLAYER_REJECTED = 'UPDATE_PLAYER_REJECTED';
export const UPDATE_PLAYER_FULFILLED = 'UPDATE_PLAYER_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_PLAYER_PENDING:
    case UPDATE_PLAYER_PENDING:
      return true;
    case REQUEST_PLAYER_REJECTED:
    case UPDATE_PLAYER_REJECTED:
    case REQUEST_PLAYER_FULFILLED:
    case UPDATE_PLAYER_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const fetchPlayer = id => {
  return (dispatch, getState) => {
    const player = getState().players.byId[id];

    return dispatch({
      type: 'REQUEST_PLAYER',
      payload: player
        ? Promise.resolve(player)
        : client.service('players').get(id)
    });
  };
};

export const updatePlayer = (id, data) => {
  return {
    type: 'UPDATE_PLAYER',
    payload: client.service('players').update(id, data)
  };
};

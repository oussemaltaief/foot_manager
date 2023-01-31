import { combineReducers } from 'redux';

import client from '../../utils/client';

import playersList, {
  REQUEST_PLAYERS_FULFILLED,
  REMOVE_PLAYER_FULFILLED
} from './players/players-list.ducks';
import addPlayer, { ADD_PLAYER_FULFILLED } from './AddPlayer/add-player.ducks';
import editPlayer, {
  REQUEST_PLAYER_FULFILLED,
  UPDATE_PLAYER_FULFILLED
} from './EditPlayer/edit-player.ducks';

export const REQUEST_ALL_PLAYERS_PENDING = 'REQUEST_ALL_PLAYERS_PENDING';
export const REQUEST_ALL_PLAYERS_REJECTED = 'REQUEST_ALL_PLAYERS_REJECTED';
export const REQUEST_ALL_PLAYERS_FULFILLED = 'REQUEST_ALL_PLAYERS_FULFILLED';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_PLAYERS_FULFILLED:
      return [
        ...new Set(state.concat(payload.data.map(attendee => attendee._id)))
      ];
    case REQUEST_ALL_PLAYERS_FULFILLED:
      return [...new Set(state.concat(payload.map(roles => roles._id)))];
    case ADD_PLAYER_FULFILLED:
    case REQUEST_PLAYER_FULFILLED:
    case UPDATE_PLAYER_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_PLAYERS_FULFILLED:
      return payload.data.reduce(
        (res, attendee) => Object.assign({}, { [attendee._id]: attendee }, res),
        state
      );
    case REQUEST_ALL_PLAYERS_FULFILLED:
      return payload.reduce(
        (res, roles) => Object.assign({}, { [roles._id]: roles }, res),
        state
      );
    case ADD_PLAYER_FULFILLED:
    case REQUEST_PLAYER_FULFILLED:
    case UPDATE_PLAYER_FULFILLED:
    case REMOVE_PLAYER_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: playersList,
  add: addPlayer,
  edit: editPlayer
});

export const fetchAllPlayers = () => {
  const query = {
    query: { $limit: -1 }
  };

  return {
    type: 'REQUEST_ALL_PLAYERS',
    payload: client.service('players').find(query)
  };
};

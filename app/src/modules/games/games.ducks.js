import { combineReducers } from 'redux';

import gamesList, {
  REQUEST_GAMES_FULFILLED,
  REMOVE_GAME_FULFILLED
} from './games/games-list.ducks';
import addGame, { ADD_GAME_FULFILLED } from './addGame/add-game.ducks';
import editGame, {
  REQUEST_GAME_FULFILLED,
  UPDATE_GAME_FULFILLED
} from './editGame/edit-game.ducks';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_GAMES_FULFILLED:
      return [
        ...new Set(state.concat(payload.data.map(attendee => attendee._id)))
      ];
    case ADD_GAME_FULFILLED:
    case REQUEST_GAME_FULFILLED:
    case UPDATE_GAME_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_GAMES_FULFILLED:
      return payload.data.reduce(
        (res, game) => Object.assign({}, { [game._id]: game }, res),
        state
      );
    case ADD_GAME_FULFILLED:
    case REQUEST_GAME_FULFILLED:
    case UPDATE_GAME_FULFILLED:
    case REMOVE_GAME_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: gamesList,
  add: addGame,
  edit: editGame
});

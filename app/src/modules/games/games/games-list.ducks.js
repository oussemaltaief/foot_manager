import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_GAMES_PENDING = 'REQUEST_GAMES_PENDING';
export const REQUEST_GAMES_REJECTED = 'REQUEST_GAMES_REJECTED';
export const REQUEST_GAMES_FULFILLED = 'REQUEST_GAMES_FULFILLED';

export const REMOVE_GAME_PENDING = 'REMOVE_GAME_PENDING';
export const REMOVE_GAME_REJECTED = 'REMOVE_GAME_REJECTED';
export const REMOVE_GAME_FULFILLED = 'REMOVE_GAME_FULFILLED';

// Reducers

const loadingGames = (state = true, { type }) => {
  switch (type) {
    case REQUEST_GAMES_PENDING:
    case REMOVE_GAME_PENDING:
      return true;
    case REQUEST_GAMES_REJECTED:
    case REQUEST_GAMES_FULFILLED:
    case REMOVE_GAME_REJECTED:
    case REMOVE_GAME_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_GAMES_FULFILLED:
      return payload.data.map(game => game._id);
    case REMOVE_GAME_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_GAMES_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_GAMES_FULFILLED:
      return payload.skip / payload.limit + 1;
    default:
      return state;
  }
};

export default combineReducers({
  loadingGames,
  ids,
  total,
  page
});

// Action Creators

export const fetchGames = ({
  page = 1,
  limit = 10,
  sort: $sort = { ref: 1 },
  filter = {}
}) => {
  const query = {
    query: {
      $limit: limit,
      $skip: getSkipFromLimitAndPage(limit, page),
      $sort,
      ...filter
    }
  };
  return {
    type: 'REQUEST_GAMES',
    payload: client.service('games').find(query)
  };
};

export const fetchAllGames = ({
  limit = -1,
  sort: $sort = { ref: 1 },
  filter = {}
}) => {
  const query = {
    query: {
      $limit: limit,
      $sort,
      ...filter
    }
  };
  return {
    type: 'REQUEST_ALL_GAMES',
    payload: client.service('games').find(query)
  };
};

export const deleteGame = id => {
  return {
    type: 'REMOVE_GAME',
    payload: client.service('games').remove(id)
  };
};

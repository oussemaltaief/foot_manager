import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_ITEMS_PENDING = 'REQUEST_ITEMS_PENDING';
export const REQUEST_ITEMS_REJECTED = 'REQUEST_ITEMS_REJECTED';
export const REQUEST_ITEMS_FULFILLED = 'REQUEST_ITEMS_FULFILLED';

export const REQUEST_ITEMS_GAMES_PENDING = 'REQUEST_ITEMS_GAMES_PENDING';
export const REQUEST_ITEMS_GAMES_REJECTED = 'REQUEST_ITEMS_GAMES_REJECTED';
export const REQUEST_ITEMS_GAMES_FULFILLED = 'REQUEST_ITEMS_GAMES_FULFILLED';

export const REQUEST_ITEMS_GAME_PENDING = 'REQUEST_ITEMS_GAME_PENDING';
export const REQUEST_ITEMS_GAME_REJECTED = 'REQUEST_ITEMS_GAME_REJECTED';
export const REQUEST_ITEMS_GAME_FULFILLED = 'REQUEST_ITEMS_GAME_FULFILLED';

export const SET_CURRENT_ITEMS_GAME = 'SET_CURRENT_ITEMS_GAME';

export const REMOVE_ITEM_PENDING = 'REMOVE_ITEM_PENDING';
export const REMOVE_ITEM_REJECTED = 'REMOVE_ITEM_REJECTED';
export const REMOVE_ITEM_FULFILLED = 'REMOVE_ITEM_FULFILLED';

// Reducers

const loadingGames = (state = true, { type }) => {
  switch (type) {
    case REQUEST_ITEMS_GAMES_PENDING:
      return true;
    case REQUEST_ITEMS_GAMES_REJECTED:
    case REQUEST_ITEMS_GAMES_FULFILLED:
      return false;
    default:
      return state;
  }
};

const loadingItems = (state = true, { type }) => {
  switch (type) {
    case REQUEST_ITEMS_PENDING:
    case REQUEST_ITEMS_GAME_PENDING:
    case REMOVE_ITEM_PENDING:
      return true;
    case REQUEST_ITEMS_REJECTED:
    case REMOVE_ITEM_REJECTED:
    case REQUEST_ITEMS_GAME_REJECTED:
    case REQUEST_ITEMS_FULFILLED:
    case REMOVE_ITEM_FULFILLED:
    case REQUEST_ITEMS_GAME_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_ITEMS_FULFILLED:
      return payload.data.map(item => item._id);
    case REMOVE_ITEM_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_ITEMS_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_ITEMS_FULFILLED:
      return payload.skip / payload.limit + 1;
    default:
      return state;
  }
};

const games = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_ITEMS_GAMES_FULFILLED:
      return payload;
    default:
      return state;
  }
};

const currentGame = (state = null, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_ITEMS_GAME:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  loadingItems,
  loadingGames,
  total,
  page,
  games,
  currentGame
});

// Action Creators

export const fetchItems = ({
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
    type: 'REQUEST_ITEMS',
    payload: client.service('items').find(query)
  };
};

export const fetchGames = () => {
  const query = {
    query: {
      $limit: -1,
      $sort: { createdAt: -1 },
      $select: ['title']
    }
  };

  return {
    type: 'REQUEST_ITEMS_GAMES',
    payload: client.service('games').find(query)
  };
};

export const fetchGame = id => {
  return (dispatch, getState) => {
    const game = getState().games.byId[id];

    return dispatch({
      type: 'REQUEST_ITEMS_GAME',
      payload: game ? Promise.resolve(game) : client.service('games').get(id)
    });
  };
};

export const setCurrentGame = game => {
  return {
    type: 'SET_CURRENT_ITEMS_GAME',
    payload: game
  };
};

export const deleteItem = id => {
  return {
    type: 'REMOVE_ITEM',
    payload: client.service('items').remove(id)
  };
};

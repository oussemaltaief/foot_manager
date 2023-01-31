import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_PLAYERS_PENDING = 'REQUEST_PLAYERS_PENDING';
export const REQUEST_PLAYERS_REJECTED = 'REQUEST_PLAYERS_REJECTED';
export const REQUEST_PLAYERS_FULFILLED = 'REQUEST_PLAYERS_FULFILLED';

export const REMOVE_PLAYER_PENDING = 'REMOVE_PLAYER_PENDING';
export const REMOVE_PLAYER_REJECTED = 'REMOVE_PLAYER_REJECTED';
export const REMOVE_PLAYER_FULFILLED = 'REMOVE_PLAYER_FULFILLED';

// Reducers

const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_PLAYERS_PENDING:
    case REMOVE_PLAYER_PENDING:
      return true;
    case REQUEST_PLAYERS_REJECTED:
    case REQUEST_PLAYERS_FULFILLED:
    case REMOVE_PLAYER_REJECTED:
    case REMOVE_PLAYER_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_PLAYERS_FULFILLED:
      return payload.data.map(client => client._id);
    case REMOVE_PLAYER_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_PLAYERS_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_PLAYERS_FULFILLED:
      return payload.skip / payload.limit + 1;
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  ids,
  total,
  page
});

// Action Creators

export const fetchPlayers = ({
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
    type: 'REQUEST_PLAYERS',
    payload: client.service('players').find(query)
  };
};

export const deletePlayer = id => {
  return {
    type: 'REMOVE_PLAYER',
    payload: client.service('players').remove(id)
  };
};

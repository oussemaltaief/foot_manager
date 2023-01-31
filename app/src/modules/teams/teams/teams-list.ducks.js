import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_TEAMS_PENDING = 'REQUEST_TEAMS_PENDING';
export const REQUEST_TEAMS_REJECTED = 'REQUEST_TEAMS_REJECTED';
export const REQUEST_TEAMS_FULFILLED = 'REQUEST_TEAMS_FULFILLED';

export const REMOVE_TEAM_PENDING = 'REMOVE_TEAM_PENDING';
export const REMOVE_TEAM_REJECTED = 'REMOVE_TEAM_REJECTED';
export const REMOVE_TEAM_FULFILLED = 'REMOVE_TEAM_FULFILLED';

// Reducers
const loading = (state = true, { type }) => {
  switch (type) {
    case REQUEST_TEAMS_PENDING:
    case REMOVE_TEAM_PENDING:
      return true;
    case REQUEST_TEAMS_REJECTED:
    case REMOVE_TEAM_REJECTED:
    case REQUEST_TEAMS_FULFILLED:
    case REMOVE_TEAM_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_TEAMS_FULFILLED:
      return payload.data.map(station => station._id);
    case REMOVE_TEAM_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_TEAMS_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_TEAMS_FULFILLED:
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

export const fetchTeams = ({
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
    type: 'REQUEST_TEAMS',
    payload: client.service('teams').find(query)
  };
};

export const deleteTeam = (id, data) => {
  return {
    type: 'REMOVE_TEAM',
    payload: client.service('teams').remove(id, data)
  };
};

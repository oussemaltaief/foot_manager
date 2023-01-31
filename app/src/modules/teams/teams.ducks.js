import { combineReducers } from 'redux';

import client from '../../utils/client';

import teamsList, {
  REMOVE_TEAM_FULFILLED,
  REQUEST_TEAMS_FULFILLED
} from './teams/teams-list.ducks';
import addTeam, { ADD_TEAM_FULFILLED } from './addTeam/addTeam.ducks';
import editTeam, {
  REQUEST_TEAM_FULFILLED,
  UPDATE_TEAM_FULFILLED
} from './editTeam/editTeam.ducks';

export const REQUEST_ALL_TEAMS_PENDING = 'REQUEST_ALL_TEAMS_PENDING';
export const REQUEST_ALL_TEAMS_REJECTED = 'REQUEST_ALL_TEAMS_REJECTED';
export const REQUEST_ALL_TEAMS_FULFILLED = 'REQUEST_ALL_TEAMS_FULFILLED';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_TEAMS_FULFILLED:
      return [...new Set(state.concat(payload.data.map(roles => roles._id)))];
    case REQUEST_ALL_TEAMS_FULFILLED:
      return [...new Set(state.concat(payload.map(roles => roles._id)))];
    case ADD_TEAM_FULFILLED:
    case REQUEST_TEAM_FULFILLED:
    case UPDATE_TEAM_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_TEAMS_FULFILLED:
      return payload.data.reduce(
        (res, roles) => Object.assign({}, { [roles._id]: roles }, res),
        state
      );
    case REQUEST_ALL_TEAMS_FULFILLED:
      return payload.reduce(
        (res, roles) => Object.assign({}, { [roles._id]: roles }, res),
        state
      );
    case ADD_TEAM_FULFILLED:
    case REQUEST_TEAM_FULFILLED:
    case UPDATE_TEAM_FULFILLED:
    case REMOVE_TEAM_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: teamsList,
  add: addTeam,
  edit: editTeam
});

// Action Creators

export const fetchAllTeams = () => {
  const query = {
    query: { $limit: -1 }
  };

  return {
    type: 'REQUEST_ALL_TEAMS',
    payload: client.service('teams').find(query)
  };
};

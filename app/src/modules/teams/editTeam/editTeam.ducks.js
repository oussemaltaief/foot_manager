import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_TEAM_PENDING = 'REQUEST_TEAM_PENDING';
export const REQUEST_TEAM_REJECTED = 'REQUEST_TEAM_REJECTED';
export const REQUEST_TEAM_FULFILLED = 'REQUEST_TEAM_FULFILLED';
export const UPDATE_TEAM_PENDING = 'UPDATE_TEAM_PENDING';
export const UPDATE_TEAM_REJECTED = 'UPDATE_TEAM_REJECTED';
export const UPDATE_TEAM_FULFILLED = 'UPDATE_TEAM_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_TEAM_PENDING:
    case UPDATE_TEAM_PENDING:
      return true;
    case REQUEST_TEAM_REJECTED:
    case UPDATE_TEAM_REJECTED:
    case REQUEST_TEAM_FULFILLED:
    case UPDATE_TEAM_FULFILLED:
      return false;
    default:
      return state;
  }
};

// Action Creators

export const fetchTeam = id => {
  return (dispatch, getState) => {
    const team = getState().teams.byId[id];

    return dispatch({
      type: 'REQUEST_TEAM',
      payload: team ? Promise.resolve(team) : client.service('teams').get(id)
    });
  };
};

export const updateTeam = (id, data) => {
  return {
    type: 'UPDATE_TEAM',
    payload: client.service('teams').update(id, data)
  };
};

export default combineReducers({ loading });

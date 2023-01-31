import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const REQUEST_COACH_PENDING = 'REQUEST_COACH_PENDING';
export const REQUEST_COACH_REJECTED = 'REQUEST_COACH_REJECTED';
export const REQUEST_COACH_FULFILLED = 'REQUEST_COACH_FULFILLED';

export const UPDATE_COACH_PENDING = 'UPDATE_COACH_PENDING';
export const UPDATE_COACH_REJECTED = 'UPDATE_COACH_REJECTED';
export const UPDATE_COACH_FULFILLED = 'UPDATE_COACH_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case REQUEST_COACH_PENDING:
    case UPDATE_COACH_PENDING:
      return true;
    case REQUEST_COACH_REJECTED:
    case UPDATE_COACH_REJECTED:
    case REQUEST_COACH_FULFILLED:
    case UPDATE_COACH_FULFILLED:
      return false;
    default:
      return state;
  }
};

// Action Creators

export const fetchCoach = id => {
  return (dispatch, getState) => {
    const coach = getState().coaches.byId[id];

    return dispatch({
      type: 'REQUEST_COACH',
      payload: coach
        ? Promise.resolve(coach)
        : client.service('coaches').get(id)
    });
  };
};

export const updateCoach = (id, data) => {
  return {
    type: 'UPDATE_COACH',
    payload: client.service('coaches').update(id, data)
  };
};

export default combineReducers({ loading });

import { combineReducers } from 'redux';

import client from '../../../utils/client';

export const ADD_COACH_PENDING = 'ADD_COACH_PENDING';
export const ADD_COACH_REJECTED = 'ADD_COACH_REJECTED';
export const ADD_COACH_FULFILLED = 'ADD_COACH_FULFILLED';

// Reducers

const loading = (state = false, { type }) => {
  switch (type) {
    case ADD_COACH_PENDING:
      return true;
    case ADD_COACH_REJECTED:
    case ADD_COACH_FULFILLED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ loading });

// Action Creators

export const addCoach = data => {
  return {
    type: 'ADD_COACH',
    payload: client.service('coaches').create(data)
  };
};

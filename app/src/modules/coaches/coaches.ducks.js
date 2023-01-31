import { combineReducers } from 'redux';

import client from '../../utils/client';

import coachesList, {
  REQUEST_COACHES_FULFILLED,
  REMOVE_COACH_FULFILLED
} from './coaches/coaches-list.ducks';
import addCoach, { ADD_COACH_FULFILLED } from './AddCoach/add-coach.ducks';
import editCoach, {
  REQUEST_COACH_FULFILLED,
  UPDATE_COACH_FULFILLED
} from './EditCoach/Edit-coach.ducks';

export const REQUEST_ALL_COACHES_PENDING = 'REQUEST_ALL_COACHES_PENDING';
export const REQUEST_ALL_COACHES_REJECTED = 'REQUEST_ALL_COACHES_REJECTED';
export const REQUEST_ALL_COACHES_FULFILLED = 'REQUEST_ALL_COACHES_FULFILLED';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_COACHES_FULFILLED:
      return [
        ...new Set(state.concat(payload.data.map(partner => partner._id)))
      ];
    case REQUEST_ALL_COACHES_FULFILLED:
      return [...new Set(state.concat(payload.map(roles => roles._id)))];
    case ADD_COACH_FULFILLED:
    case REQUEST_COACH_FULFILLED:
    case UPDATE_COACH_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_COACHES_FULFILLED:
      return payload.data.reduce(
        (res, partner) => Object.assign({}, { [partner._id]: partner }, res),
        state
      );
    case REQUEST_ALL_COACHES_FULFILLED:
      return payload.reduce(
        (res, roles) => Object.assign({}, { [roles._id]: roles }, res),
        state
      );
    case ADD_COACH_FULFILLED:
    case REQUEST_COACH_FULFILLED:
    case UPDATE_COACH_FULFILLED:
    case REMOVE_COACH_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: coachesList,
  add: addCoach,
  edit: editCoach
});

export const fetchAllCoaches = () => {
  const query = {
    query: { $limit: -1 }
  };

  return {
    type: 'REQUEST_ALL_COACHES',
    payload: client.service('coaches').find(query)
  };
};

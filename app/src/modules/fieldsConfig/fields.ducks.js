import { combineReducers } from 'redux';

import configList, {
  UPDATE_FIELDS_FULFILLED,
  ADD_FIELDS_FULFILLED,
  REQUEST_FIELD_FULFILLED
} from './fields/field.ducks';

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_FIELD_FULFILLED:
      return [...new Set(state.concat(payload.data.map(config => config._id)))];

    case ADD_FIELDS_FULFILLED:
    case UPDATE_FIELDS_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_FIELD_FULFILLED:
      return payload.data.reduce(
        (res, config) => Object.assign({}, { [config._id]: config }, res),
        state
      );
    case ADD_FIELDS_FULFILLED:
    case UPDATE_FIELDS_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: configList
});

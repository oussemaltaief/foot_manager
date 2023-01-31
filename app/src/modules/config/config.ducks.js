import { combineReducers } from 'redux';

import configList, {
  UPDATE_CONFIG_FULFILLED,
  ADD_CONFIG_FULFILLED,
  REQUEST_CONFIG_FULFILLED
} from './config/config-list.ducks';

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_CONFIG_FULFILLED:
      return [...new Set(state.concat(payload.data.map(config => config._id)))];

    case ADD_CONFIG_FULFILLED:
    case UPDATE_CONFIG_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_CONFIG_FULFILLED:
      return payload.data.reduce(
        (res, config) => Object.assign({}, { [config._id]: config }, res),
        state
      );
    case ADD_CONFIG_FULFILLED:
    case UPDATE_CONFIG_FULFILLED:
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

import { combineReducers } from 'redux';

import client from '../../utils/client';

import zonesList, {
  REQUEST_ZONES_FULFILLED,
  REMOVE_ZONE_FULFILLED
} from './Zone/Zone-list.ducks';
import addZone, { ADD_ZONE_FULFILLED } from './AddZone/add-Zone.ducks';
import editZone, {
  REQUEST_ZONE_FULFILLED,
  UPDATE_ZONE_FULFILLED
} from './EditZone/edit-Zone.ducks';

export const REQUEST_ALL_ZONES_PENDING = 'REQUEST_ALL_ZONES_PENDING';
export const REQUEST_ALL_ZONES_REJECTED = 'REQUEST_ALL_ZONES_REJECTED';
export const REQUEST_ALL_ZONES_FULFILLED = 'REQUEST_ALL_ZONES_FULFILLED';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_ZONES_FULFILLED:
      return [...new Set(state.concat(payload.data.map(zone => zone._id)))];
    case REQUEST_ALL_ZONES_FULFILLED:
      return [...new Set(state.concat(payload.map(zone => zone._id)))];
    case ADD_ZONE_FULFILLED:
    case REQUEST_ZONE_FULFILLED:
    case UPDATE_ZONE_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_ZONES_FULFILLED:
      return payload.data.reduce(
        (res, zone) => Object.assign({}, { [zone._id]: zone }, res),
        state
      );
    case REQUEST_ALL_ZONES_FULFILLED:
      return payload.reduce(
        (res, zone) => Object.assign({}, { [zone._id]: zone }, res),
        state
      );
    case ADD_ZONE_FULFILLED:
    case REQUEST_ZONE_FULFILLED:
    case UPDATE_ZONE_FULFILLED:
    case REMOVE_ZONE_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: zonesList,
  add: addZone,
  edit: editZone
});

// Action Creators

export const fetchAllZones = () => {
  const query = {
    query: { $limit: -1, $sort: { name: 1 } }
  };

  return {
    type: 'REQUEST_ALL_ZONES',
    payload: client.service('zones').find(query)
  };
};

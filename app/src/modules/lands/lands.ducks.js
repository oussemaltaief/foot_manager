import { combineReducers } from 'redux';

import landsList, {
  REQUEST_LANDS_FULFILLED,
  REMOVE_LAND_FULFILLED
} from './lands/lands-list.ducks';
import addLand, { ADD_LAND_FULFILLED } from './AddLand/add-land.ducks';
import editLand, {
  REQUEST_LAND_FULFILLED,
  UPDATE_LAND_FULFILLED
} from './EditLand/Edit-land.ducks';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_LANDS_FULFILLED:
      return [
        ...new Set(state.concat(payload.data.map(partner => partner._id)))
      ];
    case ADD_LAND_FULFILLED:
    case REQUEST_LAND_FULFILLED:
    case UPDATE_LAND_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_LANDS_FULFILLED:
      return payload.data.reduce(
        (res, partner) => Object.assign({}, { [partner._id]: partner }, res),
        state
      );
    case ADD_LAND_FULFILLED:
    case REQUEST_LAND_FULFILLED:
    case UPDATE_LAND_FULFILLED:
    case REMOVE_LAND_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: landsList,
  add: addLand,
  edit: editLand
});

import { combineReducers } from 'redux';

import itemsList, {
  REQUEST_ITEMS_FULFILLED,
  REMOVE_ITEM_FULFILLED
} from './items/items-list.ducks';
import addItem, { ADD_ITEM_FULFILLED } from './addItem/addItem.ducks';
import editItem, {
  REQUEST_ITEM_FULFILLED,
  UPDATE_ITEM_FULFILLED
} from './editItem/editItem.ducks';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_ITEMS_FULFILLED:
      return [...new Set(state.concat(payload.data.map(item => item._id)))];
    case ADD_ITEM_FULFILLED:
    case REQUEST_ITEM_FULFILLED:
    case UPDATE_ITEM_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_ITEMS_FULFILLED:
      return payload.data.reduce(
        (res, item) => Object.assign({}, { [item._id]: item }, res),
        state
      );
    case ADD_ITEM_FULFILLED:
    case REQUEST_ITEM_FULFILLED:
    case UPDATE_ITEM_FULFILLED:
    case REMOVE_ITEM_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: itemsList,
  add: addItem,
  edit: editItem
});

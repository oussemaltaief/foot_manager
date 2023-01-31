import { combineReducers } from 'redux';

import eventsList, {
  REQUEST_EVENTS_FULFILLED,
  REMOVE_EVENT_FULFILLED
} from './events/event-list.ducks';
import addEvent, { ADD_EVENT_FULFILLED } from './addEvent/add-event.ducks';
import editEvent, {
  REQUEST_EVENT_FULFILLED,
  UPDATE_EVENT_FULFILLED
} from './editEvent/edit-event.ducks';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_EVENTS_FULFILLED:
      return [
        ...new Set(state.concat(payload.data.map(attendee => attendee._id)))
      ];
    case ADD_EVENT_FULFILLED:
    case REQUEST_EVENT_FULFILLED:
    case UPDATE_EVENT_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_EVENTS_FULFILLED:
      return payload.data.reduce(
        (res, game) => Object.assign({}, { [game._id]: game }, res),
        state
      );
    case ADD_EVENT_FULFILLED:
    case REQUEST_EVENT_FULFILLED:
    case UPDATE_EVENT_FULFILLED:
    case REMOVE_EVENT_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: eventsList,
  add: addEvent,
  edit: editEvent
});

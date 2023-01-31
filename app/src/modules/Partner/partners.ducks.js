import { combineReducers } from 'redux';

import partenersList, {
  REQUEST_PARTNERS_FULFILLED,
  REMOVE_PARTNER_FULFILLED
} from './Partners/partners-list.ducks';
import addPartner, {
  ADD_PARTNER_FULFILLED
} from './AddPartner/add-partner.ducks';
import editPartner, {
  REQUEST_PARTNER_FULFILLED,
  UPDATE_PARTNER_FULFILLED
} from './EditPartner/Edit-partner.ducks';

// Reducers

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_PARTNERS_FULFILLED:
      return [
        ...new Set(state.concat(payload.data.map(partner => partner._id)))
      ];
    case ADD_PARTNER_FULFILLED:
    case REQUEST_PARTNER_FULFILLED:
    case UPDATE_PARTNER_FULFILLED:
      return [payload._id, ...state];
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case REQUEST_PARTNERS_FULFILLED:
      return payload.data.reduce(
        (res, partner) => Object.assign({}, { [partner._id]: partner }, res),
        state
      );
    case ADD_PARTNER_FULFILLED:
    case REQUEST_PARTNER_FULFILLED:
    case UPDATE_PARTNER_FULFILLED:
    case REMOVE_PARTNER_FULFILLED:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  list: partenersList,
  add: addPartner,
  edit: editPartner
});

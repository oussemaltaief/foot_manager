import { combineReducers } from 'redux';

import client from '../../../utils/client';
import { getSkipFromLimitAndPage } from '../../../utils/helpers';

export const REQUEST_EVENTS_PENDING = 'REQUEST_EVENTS_PENDING';
export const REQUEST_EVENTS_REJECTED = 'REQUEST_EVENTS_REJECTED';
export const REQUEST_EVENTS_FULFILLED = 'REQUEST_EVENTS_FULFILLED';

export const REMOVE_EVENT_PENDING = 'REMOVE_EVENT_PENDING';
export const REMOVE_EVENT_REJECTED = 'REMOVE_EVENT_REJECTED';
export const REMOVE_EVENT_FULFILLED = 'REMOVE_EVENT_FULFILLED';

// Reducers

const loadingEvents = (state = true, { type }) => {
  switch (type) {
    case REQUEST_EVENTS_PENDING:
    case REMOVE_EVENT_PENDING:
      return true;
    case REQUEST_EVENTS_REJECTED:
    case REQUEST_EVENTS_FULFILLED:
    case REMOVE_EVENT_REJECTED:
    case REMOVE_EVENT_FULFILLED:
      return false;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case REQUEST_EVENTS_FULFILLED:
      return payload.data.map(game => game._id);
    case REMOVE_EVENT_FULFILLED:
      return state.filter(id => {
        return id !== payload._id;
      });
    default:
      return state;
  }
};

const total = (state = 0, { type, payload }) => {
  switch (type) {
    case REQUEST_EVENTS_FULFILLED:
      return payload.total;
    default:
      return state;
  }
};

const page = (state = 1, { type, payload }) => {
  switch (type) {
    case REQUEST_EVENTS_FULFILLED:
      return payload.skip / payload.limit + 1;
    default:
      return state;
  }
};

export default combineReducers({
  loadingEvents,
  ids,
  total,
  page
});

// Action Creators

export const fetchEvents = ({
  page = 1,
  limit = 10,
  sort: $sort = { ref: 1 },
  filter = {}
}) => {
  const query = {
    query: {
      $limit: limit,
      $skip: getSkipFromLimitAndPage(limit, page),
      $sort,
      ...filter
    }
  };
  return {
    type: 'REQUEST_EVENTS',
    payload: client.service('events').find(query)
  };
};

export const fetchAllEvents = ({
  limit = -1,
  sort: $sort = { ref: 1 },
  filter = {}
}) => {
  const query = {
    query: {
      $limit: limit,
      $sort,
      ...filter
    }
  };
  return {
    type: 'REQUEST_ALL_Events',
    payload: client.service('events').find(query)
  };
};

export const deleteEvent = id => {
  return {
    type: 'REMOVE_EVENT',
    payload: client.service('events').remove(id)
  };
};

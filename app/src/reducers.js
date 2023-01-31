import { combineReducers } from 'redux';

import app from './modules/app/app.ducks';
import auth, { LOG_OUT_FULFILLED } from './modules/auth/auth.ducks';
import users from './modules/users/users.ducks';
import roles from './modules/roles/roles.ducks';
import config from './modules/config/config.ducks';
import zones from './modules/zone/zone.ducks';
import fields from './modules/fieldsConfig/fields.ducks';
import players from './modules/players/players.ducks';
import games from './modules/games/games.ducks';
import items from './modules/items/items.ducks';
import products from './modules/Product/Product.ducks';
import partners from './modules/Partner/partners.ducks';
import coaches from './modules/coaches/coaches.ducks';
import lands from './modules/lands/lands.ducks';
import categories from './modules/categories/categories.ducks';
import teams from './modules/teams/teams.ducks';
import events from './modules/events/events.ducks';

const appReducer = combineReducers({
  app,
  auth,
  zones,
  players,
  fields,
  users,
  config,
  roles,
  games,
  items,
  products,
  partners,
  coaches,
  lands,
  categories,
  teams,
  events
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT_FULFILLED) {
    state = { app: { initialized: true } };
  }

  return appReducer(state, action);
};

export default rootReducer;

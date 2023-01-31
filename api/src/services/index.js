const users = require('./users/users.service.js');

const roles = require('./roles/roles.service.js');

const config = require('./config/config.service.js');

const zones = require('./zones/zones.service.js');

const familyGroupe = require('./family-groupe/family-groupe.service.js');

const fieldsConfig = require('./fields-config/fields-config.service.js');

const games = require('./games/games.service.js');

const items = require('./items/items.service.js');

const players = require('./players/players.service.js');

const allGames = require('./all-games/all-games.service.js');

const fields = require('./fields/fields.service.js');

const products = require('./products/products.service.js');

const partners = require('./partners/partners.service.js');

const coaches = require('./coaches/coaches.service.js');

const lands = require('./lands/lands.service.js');

const teams = require('./teams/teams.service.js');

const categories = require('./categories/categories.service.js');

const events = require('./events/events.service.js');

module.exports = function(app) {
  app.configure(users);
  app.configure(roles);
  app.configure(config);
  app.configure(zones);
  app.configure(familyGroupe);
  app.configure(fieldsConfig);
  app.configure(games);
  app.configure(items);
  app.configure(players);
  app.configure(allGames);
  app.configure(fields);
  app.configure(products);
  app.configure(partners);
  app.configure(coaches);
  app.configure(lands);
  app.configure(teams);
  app.configure(categories);
  app.configure(events);
};

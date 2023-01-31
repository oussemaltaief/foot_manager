// Initializes the `all-games` service on path `/all-games`
const { AllGames } = require('./all-games.class');
const hooks = require('./all-games.hooks');

module.exports = function(app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.api.use('/all-games', new AllGames(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.api.service('all-games');

  service.hooks(hooks);
};

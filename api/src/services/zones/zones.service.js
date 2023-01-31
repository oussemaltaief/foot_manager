// Initializes the `zones` service on path `/zones`
const { Zones } = require('./zones.class');
const createModel = require('../../models/zones.model');
const hooks = require('./zones.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.api.use('/zones', new Zones(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.api.service('zones');

  service.hooks(hooks);
};

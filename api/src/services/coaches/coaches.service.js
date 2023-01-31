// Initializes the `coaches` service on path `/coaches`
const { Coaches } = require('./coaches.class');
const createModel = require('../../models/coaches.model');
const hooks = require('./coaches.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.api.use('/coaches', new Coaches(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.api.service('coaches');

  service.hooks(hooks);
};

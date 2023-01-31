// Initializes the `lands` service on path `/lands`
const { Lands } = require('./lands.class');
const createModel = require('../../models/lands.model');
const hooks = require('./lands.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.api.use('/lands', new Lands(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.api.service('lands');

  service.hooks(hooks);
};

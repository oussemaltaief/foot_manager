// Initializes the `config` service on path `/config`
const { Config } = require('./config.class');
const createModel = require('../../models/config.model');
const hooks = require('./config.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.api.use('/config', new Config(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.api.service('config');

  service.hooks(hooks);
};

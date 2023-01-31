// Initializes the `fieldsConfig` service on path `/fields-config`
const { FieldsConfig } = require('./fields-config.class');
const createModel = require('../../models/fields-config.model');
const hooks = require('./fields-config.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.api.use('/fields-config', new FieldsConfig(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.api.service('fields-config');

  service.hooks(hooks);
};

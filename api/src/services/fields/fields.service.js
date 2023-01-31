// Initializes the `fields` service on path `/fields`
const { Fields } = require('./fields.class');
const createModel = require('../../models/fields.model');
const hooks = require('./fields.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/fields', new Fields(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fields');

  service.hooks(hooks);
};

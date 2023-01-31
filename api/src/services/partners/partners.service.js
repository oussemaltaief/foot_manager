// Initializes the `partners` service on path `/partners`
const { Partners } = require('./partners.class');
const createModel = require('../../models/partners.model');
const hooks = require('./partners.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.api.use('/partners', new Partners(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.api.service('partners');

  service.hooks(hooks);
};

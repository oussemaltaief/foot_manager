// Initializes the `familyGroupe` service on path `/family-groupe`
const { FamilyGroupe } = require('./family-groupe.class');
const createModel = require('../../models/family-groupe.model');
const hooks = require('./family-groupe.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.api.use('/family-groupe', new FamilyGroupe(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.api.service('family-groupe');

  service.hooks(hooks);
};

const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const passKey = require('./authentication-pass-key');

module.exports = function(app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local(config.local));
  app.configure(passKey());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.api.service('authentication').hooks({
    before: {
      create: [
        passKey.hooks.addPassword,

        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [authentication.hooks.authenticate('jwt')]
    }
  });
};

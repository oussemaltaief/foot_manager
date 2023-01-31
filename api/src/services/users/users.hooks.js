const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;

const schema = require('../../schemas/users');
const validate = require('../../hooks/validate');
const setPassword = require('../../hooks/set-password');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword()],
    update: [
      authenticate('jwt'),
      validate(schema.update),
      setPassword(),
      hashPassword()
    ],
    patch: [commonHooks.disallow()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

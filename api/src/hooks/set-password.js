const { SKIP } = require('@feathersjs/feathers');

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    if (context.id && context.data && !context.data.password) {
      const user = await context.service.get(context.id);
      context.data.password = user.password;
      return SKIP;
    }
    return context;
  };
};

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    let session = await context.app
      .service('sessions')
      .Model.findOne({ status: 'open' });

    if (!session) {
      session = await context.app
        .service('sessions')
        .create({ openedAt: Date.now() });
    }

    context.data.session = session._id;

    return context;
  };
};

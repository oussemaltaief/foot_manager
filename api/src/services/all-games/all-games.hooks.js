module.exports = {
  before: {
    all: [],
    find: [
      async context => {
        if (context.params.query.service === 'getGames') {
          const result = await context.app.api
            .service('items')
            .Model.aggregate([
              { $group: { _id: '$game', items: { $push: '$$ROOT' } } }
            ]);
          const result2 = await context.app.api
            .service('games')
            .Model.populate(result, { path: '_id' });
          context.result = result2;
          return context;
        }
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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

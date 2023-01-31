const mongoose = require('mongoose');

module.exports = function(app) {
  mongoose.connect(
    app.get('mongodb'),
    { useNewUrlParser: true }
  );

  app.set('mongooseClient', mongoose);
};

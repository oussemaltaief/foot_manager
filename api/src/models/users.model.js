const { GENDER } = require('../constants');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema(
    {
      username: { type: String, unique: true, index: true },
      password: { type: String, index: true },
      firstName: { type: String, index: true },
      lastName: { type: String, index: true },
      photo: { type: String },
      passKey: { type: Number },
      gender: {
        type: String,
        enum: GENDER.ALL
      },
      type: {
        type: String
      }
    },
    {
      timestamps: true,
      collation: { locale: 'fr', strength: 1 }
    }
  );

  users.index({ createdAt: -1 });
  users.index({ lastName: 1, firstName: 1 });

  return mongooseClient.model('users', users);
};

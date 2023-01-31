// players-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const players = new Schema(
    {
      firstName: { type: String },
      lastName: { type: String },
      position: { type: String },
      photo: { type: String },
      age: { type: String },
      category: { type: Schema.Types.ObjectId, ref: 'categories' }
    },
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('players');
  } catch (e) {
    return mongooseClient.model('players', players);
  }
};

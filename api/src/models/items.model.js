// items-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const items = new Schema(
    {
      game: { ref: 'games', type: Schema.Types.ObjectId },
      name: { type: String, required: true },
      value: { type: Boolean }
    },
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('items');
  } catch (e) {
    return mongooseClient.model('items', items);
  }
};

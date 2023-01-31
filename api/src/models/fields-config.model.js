const { EVENTFIELDS } = require('../constants');

// fieldsConfig-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const field = new Schema(
    {
      key: String,
      label: String,
      required: Boolean,
      showInList: Boolean,
      type: { type: String, enum: EVENTFIELDS.FIELDS.TYPES },
      listValues: [String],
      defaultValue: String
    },
    { _id: false }
  );

  const fieldsConfig = new Schema({
    active: { type: Boolean, },
    clientGroupe: [field],
    client: [field],
    product: [field],
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('fieldsConfig');
  } catch (e) {
    return mongooseClient.model('fieldsConfig', fieldsConfig);
  }
};
